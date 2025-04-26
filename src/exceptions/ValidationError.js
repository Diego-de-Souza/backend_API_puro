class ValidationError extends Error {
    constructor(message, details, statusCode = 400){
        super(message);
        this.statusCode = statusCode;
        this.name = 'ValidationError';
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
  
module.exports = ValidationError;