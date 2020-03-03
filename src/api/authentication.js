const token = require('../util/token')
const UserService = require('../user/service')

module.exports = {
    signup: async (req, res, next) => {
        const { email, password, firstName, lastName } = req.body

        if (!email || !password) {
            return res
                .status(422)
                .send({ error: 'You must provide email and password.' })
        }

        try {
            await UserService.create({
                email, password, firstName, lastName
            })
            res.json({
                success: true
            })
        } catch ({ httpStatus, message }) {
            return res
                .status(httpStatus || 500)
                .send({ error: message })
        }
    },

    signin: (req, res, next) => {
        const email = req.body.email
        const password = req.body.password
        if (!email || !password) {
            return res
                .status(422)
                .send({ error: 'You must provide email and password.' })
        }

        UserService.verifyPassword({
            email,
            password
        })
            .then(user => res.send({
                token: token.generateToken(user)
            }))
            .catch(({ httpStatus, message }) => res
                .status(httpStatus || 500)
                .send({ error: message }))
    }
}
