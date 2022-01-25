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
class DroneService {
    constructor() {
        //starts the server on a given port
        this.start = (port) => {
            this.initializeRoutes();
            return this.app.listen(port, () => {
                console.log(`Drone service running on port ${port}`);
            });
        };
        //add all routes to the App here
        this.initializeRoutes = () => {
            new drone_routes_1.default(this.app);
            this.app.route("/")
                .get((req, res) => __awaiter(this, void 0, void 0, function* () {
                return res.status(200).send("Drone service running");
            }));
        };
        this.getAppInstance = () => {
            return this.app;
        };
        this.app = (0, express_1.default)();
    }
}
exports.default = new DroneService();
