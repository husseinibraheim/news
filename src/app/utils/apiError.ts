class APIError extends Error {
    statusCode : number;
    constructor(message: string , statusCode=5000){
        super(message);
        this.statusCode = statusCode;
    }
}
export default APIError;
  
// implement API errors 