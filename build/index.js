"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
//import periodicCheck from "./controllers/periodic-check"
const app_credentials_1 = __importDefault(require("./helpers/app-credentials"));
//Connect to Database
app_1.default.connectDb(app_credentials_1.default.dbUrl);
//Start Service
app_1.default.start(app_credentials_1.default.port);
//Run Cron Job
//periodicCheck.start(AppCredentials.periodicCheckInterval); 
