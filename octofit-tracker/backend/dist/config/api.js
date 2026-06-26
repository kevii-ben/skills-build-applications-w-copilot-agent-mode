"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = getApiBaseUrl;
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    const codespacesUrl = `https://${codespaceName}-8000.app.github.dev`;
    if (codespaceName) {
        return codespacesUrl;
    }
    return 'http://localhost:8000';
}
