param(
  [string]$RootCN,
  [string]$ServerCN,
  [string]$PfxPath,
  [string]$PfxPassword
)

$ErrorActionPreference = 'Stop'

if (-not $RootCN) { $RootCN = 'KittyCAD-Test-Root' }
if (-not $ServerCN) { $ServerCN = 'localhost' }
if (-not $PfxPath) { $PfxPath = 'servercert.pfx' }
if (-not $PfxPassword) { $PfxPassword = 'pass' }

function Log([string]$msg) {
  $ts = Get-Date -Format 'HH:mm:ss'
  Write-Host "[$ts] $msg"
}

function Invoke-With-Timeout([ScriptBlock]$ScriptBlock, [int]$TimeoutSeconds, [object[]]$ArgumentList) {
  $job = Start-Job -ScriptBlock $ScriptBlock -ArgumentList $ArgumentList
  try {
    if (Wait-Job -Job $job -Timeout $TimeoutSeconds) {
      $res = Receive-Job -Job $job -ErrorAction Stop
      return $res
    } else {
      throw "Timeout after $TimeoutSeconds seconds"
    }
  } finally {
    Stop-Job $job -ErrorAction SilentlyContinue | Out-Null
    Remove-Job $job -ErrorAction SilentlyContinue | Out-Null
  }
}

function Invoke-ProcessWithTimeout([string]$File, [string]$Arguments, [int]$TimeoutSeconds) {
  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = $File
  $psi.Arguments = $Arguments
  $psi.UseShellExecute = $false
  $psi.RedirectStandardOutput = $true
  $psi.RedirectStandardError = $true
  $p = New-Object System.Diagnostics.Process
  $p.StartInfo = $psi
  [void]$p.Start()
  if ($p.WaitForExit($TimeoutSeconds * 1000)) {
    $stdout = $p.StandardOutput.ReadToEnd()
    $stderr = $p.StandardError.ReadToEnd()
    if ($p.ExitCode -ne 0) { throw "Process failed ($File): $($p.ExitCode) `n$stderr" }
    return $stdout
  } else {
    try { $p.Kill() } catch {}
    throw "Process timeout: $File $Arguments"
  }
}

Log "Creating local root CA and server cert..."


# Create a root CA in CurrentUser store (use splatting for reliability)
$rootParams = @{
  Type              = 'Custom'
  KeySpec           = 'Signature'
  Subject           = "CN=$RootCN"
  KeyExportPolicy   = 'Exportable'
  HashAlgorithm     = 'sha256'
  KeyLength         = 2048
  CertStoreLocation = 'Cert:\CurrentUser\My'
  # Pass as string array so binder maps to enum values
  KeyUsage          = @('CertSign','CRLSign','DigitalSignature')
  NotAfter          = (Get-Date).AddMonths(3)
  TextExtension     = @('2.5.29.19={text}CA=1&pathlength=3')
}
$sw = [System.Diagnostics.Stopwatch]::StartNew()
$root = New-SelfSignedCertificate @rootParams
Log "Root created in $($sw.Elapsed.TotalSeconds.ToString('0.00'))s"

# Create a server cert signed by the root
$serverParams = @{
  Type              = 'Custom'
  DnsName           = @('localhost', '127.0.0.1')
  Subject           = "CN=$ServerCN"
  KeyExportPolicy   = 'Exportable'
  HashAlgorithm     = 'sha256'
  KeyLength         = 2048
  CertStoreLocation = 'Cert:\CurrentUser\My'
  # Pass as string array
  KeyUsage          = @('DigitalSignature','KeyEncipherment')
  Signer            = $root
  TextExtension     = @('2.5.29.19={text}CA=0')
}
$sw.Restart()
$server = New-SelfSignedCertificate @serverParams
Log "Server cert created in $($sw.Elapsed.TotalSeconds.ToString('0.00'))s"

# Trust the root CA in CurrentUser\Root store. Prefer .NET APIs to avoid any UI.
$rootCer = Join-Path $PWD 'root.cer'
$sw.Restart()
Export-Certificate -Cert $root -FilePath $rootCer | Out-Null
Log "Root exported in $($sw.Elapsed.TotalSeconds.ToString('0.00'))s"

$timeout = [int]([Environment]::GetEnvironmentVariable('ZOO_CA_IMPORT_TIMEOUT') ?? '120')
Log "Importing root into CurrentUser\\Root (timeout ${timeout}s)..."
$sw.Restart()
try {
  Invoke-With-Timeout {
    param($path)
    $ErrorActionPreference = 'Stop'
    $cert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2($path)
    $store = New-Object System.Security.Cryptography.X509Certificates.X509Store('Root',[System.Security.Cryptography.X509Certificates.StoreLocation]::CurrentUser)
    $store.Open([System.Security.Cryptography.X509Certificates.OpenFlags]::ReadWrite)
    try { $store.Add($cert) } finally { $store.Close() }
  } $timeout @($rootCer)
  Log "Root imported in $($sw.Elapsed.TotalSeconds.ToString('0.00'))s"
} catch {
  Log ".NET store import failed or timed out: $($_.Exception.Message). Falling back to certutil..."
  $sw.Restart()
  # Use force (-f) and quiet (-q) to avoid UI prompts in non-interactive sessions
  Invoke-ProcessWithTimeout 'certutil' "-user -f -q -addstore Root `"$rootCer`"" $timeout | Out-Null
  Log "certutil import completed in $($sw.Elapsed.TotalSeconds.ToString('0.00'))s"
}

# Export server cert as PFX for the Node HTTPS server
$pwd = ConvertTo-SecureString -String $PfxPassword -Force -AsPlainText
$sw.Restart()
Export-PfxCertificate -Cert $server -FilePath $PfxPath -Password $pwd | Out-Null
Log "PFX exported in $($sw.Elapsed.TotalSeconds.ToString('0.00'))s"

Log "Local CA created and trusted. PFX at $PfxPath"
