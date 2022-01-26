import  { CustomError} from './custom-error'
export class NotFoundError extends CustomError{
    reason = "Route Not Found"
    statusCode = 404
    constructor(){
        
        super("Route Not Found")
        
        //We do this when extending a built in class
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors = () => {
        return [
            {message: this.reason}
        ]
    }
}