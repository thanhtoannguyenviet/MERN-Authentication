class ErrorResponse extends Error{
    constructor(message,statusCdoe) {
        super(message);
        this.statusCode= statusCdoe
    }
}
module.exports = ErrorResponse