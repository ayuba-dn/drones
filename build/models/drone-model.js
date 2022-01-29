"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drone = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MedicationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    weight: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true,
        max: 500
    },
    image: {
        type: String,
        required: true
    }
});
const Medication = mongoose_1.default.model('Medication', MedicationSchema);
const droneSchema = new mongoose_1.default.Schema({
    serialNumber: {
        type: String,
        required: true,
        maxLength: 100
    },
    model: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true,
        max: 500
    },
    battery: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true,
        enum: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING']
    },
    medications: {
        type: [],
        default: []
    }
});
droneSchema.statics.Create = (droneData) => {
    return new Drone(droneData);
};
const Drone = mongoose_1.default.model('Drone', droneSchema); //Second parameter will put into consideration all we did to the drone schema before binding
exports.Drone = Drone;
