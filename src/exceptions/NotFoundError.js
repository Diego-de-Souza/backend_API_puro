class NotFoundError extends Error {
    constructor(message, details, statusCode = 404){
        super(message);
        this.statusCode = statusCode;
        this.name = 'NotFoundError';
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
          name: this.name,
          message: this.message,
          statusCode: this.statusCode,
          details: this.details || undefined
        };
    }
}
  
module.exports = NotFoundError;