class TeamErrors extends Error {
    constructor ({ message, httpStatus }) {
        super(message)
        this.name = 'TeamError'
        this.httpStatus = httpStatus
    }
}

module.exports = TeamErrors
