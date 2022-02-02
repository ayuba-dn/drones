import  { BaseError} from './base-error'
export class DatabaseConnectionError extends BaseError{
    reason = "Database not connected"
    statusCode = 500
    constructor(public error: string){
        
        super("error connecting database")
        
        //We do this when extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors = () => {
        return [
            {message: this.reason}
        ]
    }
}