    
const dbName = process.env.DB_NAME || 'test_drones'
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const authDbName = process.env.AUTH_DB_NAME || 'admin';
const dbUser = process.env.DB_USER || 'droneuser';
const dbPassword = process.env.DB_PASSWORD || 'xc892zx22';
const dbUrl: string = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=${authDbName}`


const validDrone = {
    serialNumber:"7474848484",
    model:"Lightweight",
    weight:45,
    battery:0.9,
    state:"LOADING"
}

const lowBatteryDrone = {
    serialNumber:"7474848484",
    model:"Lightweight",
    weight:45,
    battery:0.24,
    state:"LOADING"
}

const invalidWeightDrone = {
    serialNumber:"7474848484",
    model:"Lightweight",
    weight:600, //500 is max
    battery:0.9,
    state:"LOADING"
}

const lowWeightDrone = {
    serialNumber:"7474848484",
    model:"Lightweight",
    weight:45,
    battery:0.9,
    state:"LOADING"
}

const idleDrone = {
    serialNumber:"7474848484",
    model:"Lightweight",
    weight:45,
    battery:0.9,
    state:"IDLE"
}

let droneIds = {
    validDrone: null,
    lowBatteryDrone: null,
    InvalidWeightDrone: null,
    lowWeightDrone: null,
    idleDrone: null
}

const validMedicationData = {
    name:"Sierra-243",
    weight:10,
    code:"DOGE",
    image:'xyz.png'
}

const highWeightMedicationData = {
    name:"SIERRA 243",
    weight:500,
    code:"rr244", //Invalid
    image:'xyz.png'
}


export {
         dbUrl,validDrone,lowBatteryDrone,
               invalidWeightDrone,lowWeightDrone,
                      idleDrone,droneIds,validMedicationData,highWeightMedicationData
        }