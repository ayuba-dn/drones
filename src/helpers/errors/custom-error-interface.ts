interface CustomError {
    statusCode: string,
    serializeErrors(): 
        {
            message: string,
            field?: string
        }[]
    
   
}