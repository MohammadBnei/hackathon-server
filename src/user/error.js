class UserErrors extends Error {
    constructor ({ message, httpStatus }) {
        super(message)
        this.name = 'UserError'
        this.httpStatus = httpStatus
    }
}

module.exports = UserErrors
