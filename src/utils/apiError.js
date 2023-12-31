class apiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        statck = ""
    ){
        super(message)
        this,statusCode = statusCode,
        this.message = message,
        this.errors = errors,
        this.data = null,
        this.success = false

        if(statck){
            this.statck = statck
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { apiError }