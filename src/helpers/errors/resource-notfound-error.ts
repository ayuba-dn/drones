import  { CustomError} from './custom-error'

export class ResourceNotFoundError extends CustomError{ //Implements Serializable
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