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
const drone_repository_1 = __importDefault(require("../repositories/drone-repository"));
const node_cron_1 = __importDefault(require("node-cron"));
const logger_1 = require("../helpers/logger");
class PeriodicChecker {
    constructor() {
        this.interval = '';
        this.start = (interval) => __awaiter(this, void 0, void 0, function* () {
            node_cron_1.default.schedule(interval, () => __awaiter(this, void 0, void 0, function* () {
                logger_1.logger.info(`${Date.now()} Periodic Check Running....`);
                let drones = yield drone_repository_1.default.getAll();
                drones.forEach(drone => {
                    logger_1.logger.info(`Drone ID: ${drone._id} Battery Level: ${drone.battery}`);
                });
            }));
        });
    }
}
exports.default = new PeriodicChecker();
