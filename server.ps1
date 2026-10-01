$listener = New-Object System.Net.HttpListener
$port = 8080
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Output "Server running on http://localhost:$port/"

$root = $PSScriptRoot

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($urlPath) -or $urlPath -eq "/") {
            $urlPath = "index.html"
        }

        $filePath = Join-Path $root $urlPath

        if (Test-Path $filePath -PathType Leaf) {
            $contentBytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".svg"  { "image/svg+xml" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".png"  { "image/png" }
                ".webp" { "image/webp" }
                ".json" { "application/json" }
                default { "application/octet-stream" }
            }
            $response.ContentType = $contentType
            $response.ContentLength64 = $contentBytes.Length
            $response.OutputStream.Write($contentBytes, 0, $contentBytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    } catch {
        # continue
    }
}
