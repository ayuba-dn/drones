import  { BaseError} from './base-error'

export class DroneCapacityError extends BaseError{ //Implements Serializable
    statusCode = 400
    constructor(public error: string){
        super("Drone Validation Error")

        //We do this when extending a built in class
        Object.setPrototypeOf(this, DroneCapacityError.prototype)
    }

    serializeErrors = () => {
        let formattedErrors = [{message: this.error}]
        return formattedErrors
    }
}