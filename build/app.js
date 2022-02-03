"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const drone_routes_1 = __importDefault(require("./routes/drone-routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_handler_1 = require("./middlewares/error-handler");
const not_found_error_1 = require("./helpers/errors/not-found-error");
const database_connection_error_1 = require("./helpers/errors/database-connection-error");
const swaggerUi = require("swagger-ui-express");
const fs_1 = __importDefault(require("fs"));
class DroneService {
    constructor() {
        this.swaggerFile = (process.cwd() + "/swagger.json");
        this.swaggerData = fs_1.default.readFileSync(this.swaggerFile, 'utf8');
        this.swaggerDocument = JSON.parse(this.swaggerData);
        //starts the server on a given port
        this.start = (port) => {
            return this.app.listen(port, () => {
                console.log(`Drone service is running on port >>>> ${port}`);
            });
        };
        //add all routes to the App here
        this.initializeRoutes = () => {
            new drone_routes_1.default(this.app);
            this.app.route("/")
                .get((req, res) => __awaiter(this, void 0, void 0, function* () {
                return res.status(200).send("Drone service running");
            }));
            this.app.all('*', (req, res) => __awaiter(this, void 0, void 0, function* () {
                throw new not_found_error_1.NotFoundError();
            }));
            this.app.use(error_handler_1.errorHandler);
        };
        this.getAppInstance = () => {
            return this.app;
        };
        this.runJobs = () => {
        };
        this.connectDb = (dbUrl) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(dbUrl);
                console.log("Connected to database");
            }
            catch (error) {
                console.log("Error Connecting to database", error);
                throw new database_connection_error_1.DatabaseConnectionError("Error Connecting DB");
            }
        });
        this.app = express_1.default();
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static("public")); //needed to serve API docs
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument));
        this.initializeRoutes();
    }
}
exports.default = new DroneService();
