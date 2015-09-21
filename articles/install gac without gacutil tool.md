## Install GAC without gacutil too

Most time we should be use gac util too to instll gac in computer for windows. 
But sometimes if the compouter didn't install VS or doesn't have gac util tool, 
how to install gac use comand line? I found a solution for it then memo it.
````javascript
   1:  BEGIN {
   2:      $ErrorActionPreference = "Stop"
   3:      
   4:      if ( $null -eq ([AppDomain]::CurrentDomain.GetAssemblies() |? { $_.FullName -eq "System.EnterpriseServices, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" }) ) {
   5:          [System.Reflection.Assembly]::Load("System.EnterpriseServices, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a") | Out-Null
   6:      }
   7:      
   8:      $publish = New-Object System.EnterpriseServices.Internal.Publish
   9:  }
  10:  PROCESS {
  11:      $assembly = $null
  12:      
  13:      if ( $_ -is [string] ) {
  14:          $assembly = $_
  15:      } elseif ( $_ -is [System.IO.FileInfo] ) {
  16:          $assembly = $_.FullName
  17:      } else {
  18:          throw ("The object type '{0}' is not supported." -f $_.GetType().FullName)
  19:      }
  20:      
  21:      if ( -not (Test-Path $assembly -type Leaf) ) {
  22:          throw "The assembly '$assembly' does not exist."
  23:      }
  24:      
  25:      if ( [System.Reflection.Assembly]::LoadFile( $assembly ).GetName().GetPublicKey().Length -eq 0 ) {
  26:          throw "The assembly '$assembly' must be strongly signed."
  27:      }
  28:      
  29:      Write-Output "Installing: $assembly"
  30:      
  31:      $publish.GacInstall( $assembly )
  32:  }

````
the reference: [PowerShell: Install-Gac (GACUTIL for PowerShell)](http://weblogs.asp.net/adweigert/powershell-install-gac-gacutil-for-powershell)