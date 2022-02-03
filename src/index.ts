import DroneService from "./app"
import periodicCheck from "./controllers/periodic-check"
import AppCredentials from "./helpers/app-credentials"


//Connect to Database
DroneService.connectDb(AppCredentials.dbUrl)

//Start Service
DroneService.start(AppCredentials.port); 

//Run Cron Job
periodicCheck.start(AppCredentials.periodicCheckInterval); 

