"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = parseInt(process.env.PORT) || 4000;
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_NAME || 'drones';
const authDbName = process.env.AUTH_DB_NAME || 'admin';
const dbUser = process.env.DB_USER || 'droneuser';
const dbPassword = process.env.DB_PASSWORD || 'xc892zx22';
const dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=${authDbName}`;
console.log("connectionssss url>>", dbUrl);
//Connect to Database
app_1.default.connectDb(dbUrl);
//Start Service
app_1.default.start(port);
