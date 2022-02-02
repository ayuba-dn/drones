interface BaseError {
    statusCode: string,
    serializeErrors(): 
        {
            message: string,
            field?: string
        }[]
    
   
}