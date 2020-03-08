const UserService = require('../user/service')
const token = require('../util/token')

module.exports = {
    loginRequired: (req, res, next) => {
        if (!req.header('Authorization')) return res.status(401).send({ message: 'Please make sure your request has an Authorization header.' })

        // Validate jwt
        const tryToken = req.header('Authorization').split(' ')[0]
        token.verifyToken(tryToken, (err, payload) => {
            if (err) return res.status(401).send(err)
            try {
                UserService.findById(payload.sub)
                    .then(user => {
                        user.password = undefined
                        delete user.password
                        req.user = user
                        next()
                    })
            } catch ({ httpStatus, message }) {
                return res.status(httpStatus).send(message || {
                    error: 'middleware User not found!!!'
                })
            }
        })
    },

    roleCheck: (expectedRoles = []) => (req, res, next) => {
        if (!req.user) {
            return res.status(500).send('User isn\'t specified in the request')
        }

        if (!req.user.status || !expectedRoles.includes(req.user.status.role)) {
            return res.status(403).send('You don\'t have the correct acces rights : expected a ' + expectedRoles.join(' or '))
        }

        next()
    }
}
