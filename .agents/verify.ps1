# Automated Guardrail Verification Runner
Write-Host "Running Guardrail Unit Tests..." -ForegroundColor Cyan

python "$PSScriptRoot\test_guard.py"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nAll guardrails and security interceptors passed successfully!" -ForegroundColor Green
} else {
    Write-Host "`nSome guardrail tests failed. Please review." -ForegroundColor Red
}
