const UserModel = require('../user/model')
const token = require('../util/token')

module.exports = {
    loginRequired: (req, res, next) => {
        if (!req.header('Authorization')) return res.status(401).send({ message: 'Please make sure your request has an Authorization header.' })

        // Validate jwt
        const tryToken = req.header('Authorization').split(' ')[0]
        token.verifyToken(tryToken, (err, payload) => {
            if (err) return res.status(401).send(err)
            UserModel.findById(payload.sub)
                .exec((err, user) => {
                    if (err || !user) {
                        return res.status(404).send(err || {
                            error: 'middleware User not found!!!'
                        })
                    }
                    delete user.password
                    req.user = user
                    next()
                })
        })
    }
}
