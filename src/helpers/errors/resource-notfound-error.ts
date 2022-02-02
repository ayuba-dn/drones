import  { BaseError} from './base-error'

export class ResourceNotFoundError extends BaseError{ //Implements Serializable
    statusCode = 404
    constructor(public error: string){
        super(error)

        //We do this when extending a built in class
        Object.setPrototypeOf(this, ResourceNotFoundError.prototype)
    }

    serializeErrors = () => {
        let formattedErrors = [{message: this.error}]
        return formattedErrors
    }
}