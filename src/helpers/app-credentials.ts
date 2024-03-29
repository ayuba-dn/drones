
import dotenv from "dotenv"
dotenv.config();

 class AppCredentials {
     port: number = parseInt(process.env.PORT!) || 4000
     dbHost = process.env.DB_HOST || 'localhost'
     dbPort = process.env.DB_PORT || '27017'
     dbName = process.env.DB_NAME || 'coursereg'
     authDbName = process.env.AUTH_DB_NAME || 'admin'
     dbUser = process.env.DB_USER || 'ilerah'
     dbPassword = process.env.DB_PASSWORD || 'xc892zx22'
     periodicCheckInterval: string = process.env.PERIODIC_CHECK_INTERVAL || '*/0.5 * * * *'
     
    // dbUrl: string = `mongodb://${this.dbUser}:${this.dbPassword}@${this.dbHost}:${this.dbPort}/${this.dbName}?authSource=${this.authDbName}`
    dbUrl: string = 'mongodb://localhost:27017/coursereg'

}

export default new AppCredentials()

