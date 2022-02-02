import  { BaseError} from './base-error'

export class InternalServerError extends BaseError{ //Implements Serializable
    statusCode = 500
    private error:string
    constructor(error?: string){
        super("Internal Server Error")
        this.error = error ? error : "Internal Server Error"
        //We do this when extending a built in class
        Object.setPrototypeOf(this, InternalServerError.prototype)
    }

    serializeErrors = () => {
        let formattedErrors = [{message: this.error}]
        return formattedErrors
    }
}