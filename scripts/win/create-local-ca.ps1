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

Write-Host "Creating local root CA and server cert..."

# Enum alias for readability
$Ku = [Microsoft.CertificateServices.Commands.KeyUsage]

# Create a root CA in CurrentUser store (use splatting for reliability)
$rootParams = @{
  Type              = 'Custom'
  KeySpec           = 'Signature'
  Subject           = "CN=$RootCN"
  KeyExportPolicy   = 'Exportable'
  HashAlgorithm     = 'sha256'
  KeyLength         = 2048
  CertStoreLocation = 'Cert:\CurrentUser\My'
  KeyUsage          = @($Ku::CertSign, $Ku::CRLSign, $Ku::DigitalSignature)
  NotAfter          = (Get-Date).AddMonths(3)
  TextExtension     = @('2.5.29.19={text}CA=1&pathlength=3')
}
$root = New-SelfSignedCertificate @rootParams

# Create a server cert signed by the root
$serverParams = @{
  Type              = 'Custom'
  DnsName           = @('localhost', '127.0.0.1')
  Subject           = "CN=$ServerCN"
  KeyExportPolicy   = 'Exportable'
  HashAlgorithm     = 'sha256'
  KeyLength         = 2048
  CertStoreLocation = 'Cert:\CurrentUser\My'
  KeyUsage          = @($Ku::DigitalSignature, $Ku::KeyEncipherment)
  Signer            = $root
  TextExtension     = @('2.5.29.19={text}CA=0')
}
$server = New-SelfSignedCertificate @serverParams

# Trust the root CA in CurrentUser\Root store using Import-Certificate (avoids certutil hangs)
$rootCer = Join-Path $PWD 'root.cer'
Export-Certificate -Cert $root -FilePath $rootCer | Out-Null
Import-Certificate -FilePath $rootCer -CertStoreLocation "Cert:\CurrentUser\Root" | Out-Null

# Export server cert as PFX for the Node HTTPS server
$pwd = ConvertTo-SecureString -String $PfxPassword -Force -AsPlainText
Export-PfxCertificate -Cert $server -FilePath $PfxPath -Password $pwd | Out-Null

Write-Host "Local CA created and trusted. PFX at $PfxPath"
