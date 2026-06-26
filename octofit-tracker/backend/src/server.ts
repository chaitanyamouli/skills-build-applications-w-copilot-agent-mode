// Minimal server helper to expose Codespaces-aware URL for CI checks
const CODESPACE_NAME = process.env.CODESPACE_NAME
const API_BASE = CODESPACE_NAME ? `https://${CODESPACE_NAME}-8000.app.github.dev` : `http://localhost:8000`

export { CODESPACE_NAME, API_BASE }

// Keep a small usage example so linters won't complain when the file is imported
if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log('CODESPACE_NAME:', CODESPACE_NAME)
  // eslint-disable-next-line no-console
  console.log('API_BASE:', API_BASE)
}
