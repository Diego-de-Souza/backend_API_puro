class DomainError extends Error {
    constructor(message, details, statusCode = 422){
        super(message);
        this.statusCode = statusCode;
        this.name = 'DomainError';
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
  
module.exports = DomainError;