import  { CustomError} from './custom-error'

export class BadRequestError extends CustomError{ //Implements Serializable
    statusCode = 400
    //reason: string
    constructor(private reason:string){
        super(reason)
    // this.reason = reason
        //We do this when extending a built in class
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors = () => {
       return [
        {
          message: this.reason
        }
       ]
    }
}