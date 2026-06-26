"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const api_1 = require("./config/api");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
async function start() {
    await (0, database_1.connectToDatabase)();
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${(0, api_1.getApiBaseUrl)()}`);
        console.log('Codespaces URL format: https://$CODESPACE_NAME-8000.app.github.dev');
    });
}
start().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
});
