const UserModel = require('./model')

module.exports = {
    getUser: (req, res) => {
        return res.status(200)
    },

    getAllUsers: (req, res) => {
        UserModel.find()
            .then(users => res.status(200).send(users))
    },

    updateProfile: (req, res, next) => {
        req.user.comparedPassword(req.body.password, (err, good) => {
            if (err || !good) return res.status(401).send(err || 'Incorrect Password')
            const userId = req.user._id
            const newProfile = {
                name: {
                    first: req.body.firstName,
                    last: req.body.lastName
                }
            }
            delete newProfile.email
            delete newProfile.phone
            delete newProfile.password

            console.log({ userId })

            UserModel.findByIdAndUpdate(userId, newProfile, { new: true })
                .then((user) => res.status(200).send(user))
                .catch(err => res.status(500).send(err))
        })
    },

    updateUser: (req, res, next) => {
        const { id, email } = req.body

        if (!id && !email) {
            return res.status(401).send('You must provide an id or an email')
        }
    }

}
