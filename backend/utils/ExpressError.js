class ExpressError extends Error{
    constructor(message,statusCode){
        super(); // calls constructor of class Error so that we can access its members
        this.message = message;
        this.statusCode  = statusCode;
    }
}

module.exports = ExpressError;