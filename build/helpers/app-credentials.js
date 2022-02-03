"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AppCredentials {
    constructor() {
        this.port = parseInt(process.env.PORT) || 4000;
        this.dbHost = process.env.DB_HOST || 'localhost';
        this.dbPort = process.env.DB_PORT || '27017';
        this.dbName = process.env.DB_NAME || 'drones';
        this.authDbName = process.env.AUTH_DB_NAME || 'admin';
        this.dbUser = process.env.DB_USER || 'droneuser';
        this.dbPassword = process.env.DB_PASSWORD || 'xc892zx22';
        this.periodicCheckInterval = process.env.PERIODIC_CHECK_INTERVAL || '*/0.5 * * * *';
        this.dbUrl = `mongodb://${this.dbUser}:${this.dbPassword}@${this.dbHost}:${this.dbPort}/${this.dbName}?authSource=${this.authDbName}`;
    }
}
exports.default = new AppCredentials();
