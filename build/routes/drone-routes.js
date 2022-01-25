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
Object.defineProperty(exports, "__esModule", { value: true });
const base_route_1 = require("../helpers/base-route");
class DroneRoutes extends base_route_1.BaseRoute {
    constructor(app) {
        super(app);
    }
    setUpRoutes() {
        this.app.route("/drones")
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = "drones.....";
            return res.send(response);
        }))
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = "drone created";
            return res.send(response);
        }))
            .put((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = "drone updated";
            return res.send(response);
        }))
            .delete((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = "drone deleted";
            return res.send(response);
        }));
        return this.app;
    }
}
exports.default = DroneRoutes;
