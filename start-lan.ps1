$route = Get-NetRoute -DestinationPrefix "0.0.0.0/0" |
  Where-Object { $_.NextHop -ne "0.0.0.0" } |
  Sort-Object RouteMetric, InterfaceMetric |
  Select-Object -First 1

if (-not $route) {
  throw "Impossible de detecter l'interface reseau active pour Expo LAN."
}

$ip = Get-NetIPAddress -AddressFamily IPv4 -InterfaceIndex $route.InterfaceIndex |
  Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254*" } |
  Select-Object -First 1 -ExpandProperty IPAddress

if (-not $ip) {
  throw "Impossible de detecter une IPv4 locale pour Expo LAN."
}

$env:REACT_NATIVE_PACKAGER_HOSTNAME = $ip
$env:EXPO_NO_DEPENDENCY_VALIDATION = "1"

Write-Host "Expo LAN sur $ip"
npx expo start --lan @args
