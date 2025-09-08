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

# Create a root CA in CurrentUser store
$root = New-SelfSignedCertificate \
  -Type Custom \
  -KeySpec Signature \
  -Subject "CN=$RootCN" \
  -KeyExportPolicy Exportable \
  -HashAlgorithm sha256 \
  -KeyLength 2048 \
  -CertStoreLocation "Cert:\CurrentUser\My" \
  -KeyUsage CertSign,CRLSign,DigitalSignature \
  -NotAfter (Get-Date).AddMonths(3) \
  -TextExtension @("2.5.29.19={text}CA=1&pathlength=3")

# Create a server cert signed by the root
$server = New-SelfSignedCertificate \
  -Type Custom \
  -DnsName "localhost","127.0.0.1" \
  -Subject "CN=$ServerCN" \
  -KeyExportPolicy Exportable \
  -HashAlgorithm sha256 \
  -KeyLength 2048 \
  -CertStoreLocation "Cert:\CurrentUser\My" \
  -KeyUsage DigitalSignature,KeyEncipherment \
  -Signer $root \
  -TextExtension @("2.5.29.19={text}CA=0")

# Trust the root CA in CurrentUser\Root store using Import-Certificate (avoids certutil hangs)
$rootCer = Join-Path $PWD 'root.cer'
Export-Certificate -Cert $root -FilePath $rootCer | Out-Null
Import-Certificate -FilePath $rootCer -CertStoreLocation "Cert:\CurrentUser\Root" | Out-Null

# Export server cert as PFX for the Node HTTPS server
$pwd = ConvertTo-SecureString -String $PfxPassword -Force -AsPlainText
Export-PfxCertificate -Cert $server -FilePath $PfxPath -Password $pwd | Out-Null

Write-Host "Local CA created and trusted. PFX at $PfxPath"
