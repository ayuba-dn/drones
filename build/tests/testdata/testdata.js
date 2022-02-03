"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highWeightMedicationData = exports.validMedicationData = exports.droneIds = exports.idleDrone = exports.lowWeightDrone = exports.invalidWeightDrone = exports.lowBatteryDrone = exports.validDrone = exports.dbUrl = void 0;
const dbName = process.env.DB_NAME || 'test_drones';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const authDbName = process.env.AUTH_DB_NAME || 'admin';
const dbUser = process.env.DB_USER || 'droneuser';
const dbPassword = process.env.DB_PASSWORD || 'xc892zx22';
const dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=${authDbName}`;
exports.dbUrl = dbUrl;
const validDrone = {
    serialNumber: "7474848484",
    model: "Lightweight",
    weight: 45,
    battery: 0.9,
    state: "LOADING"
};
exports.validDrone = validDrone;
const lowBatteryDrone = {
    serialNumber: "7474848484",
    model: "Lightweight",
    weight: 45,
    battery: 0.24,
    state: "LOADING"
};
exports.lowBatteryDrone = lowBatteryDrone;
const invalidWeightDrone = {
    serialNumber: "7474848484",
    model: "Lightweight",
    weight: 600,
    battery: 0.9,
    state: "LOADING"
};
exports.invalidWeightDrone = invalidWeightDrone;
const lowWeightDrone = {
    serialNumber: "7474848484",
    model: "Lightweight",
    weight: 45,
    battery: 0.9,
    state: "LOADING"
};
exports.lowWeightDrone = lowWeightDrone;
const idleDrone = {
    serialNumber: "7474848484",
    model: "Lightweight",
    weight: 45,
    battery: 0.9,
    state: "IDLE"
};
exports.idleDrone = idleDrone;
let droneIds = {
    validDrone: null,
    lowBatteryDrone: null,
    InvalidWeightDrone: null,
    lowWeightDrone: null,
    idleDrone: null
};
exports.droneIds = droneIds;
const validMedicationData = {
    name: "Sierra-243",
    weight: 10,
    code: "DOGE",
    image: 'xyz.png'
};
exports.validMedicationData = validMedicationData;
const highWeightMedicationData = {
    name: "SIERRA 243",
    weight: 500,
    code: "rr244",
    image: 'xyz.png'
};
exports.highWeightMedicationData = highWeightMedicationData;
