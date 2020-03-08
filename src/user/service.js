const UserModel = require('./model')
const UserError = require('./error')

module.exports = {
    findById: async (id) => {
        const user = await UserModel.findById(id)

        if (!user) {
            throw new UserError({
                message: 'Cannot find user by id',
                httpStatus: 401
            })
        }

        return user
    },

    create: async (newUser) => {
        /**
         * TODO : Verification of the _user
         * TODO : Sanity check
         */

        const { email, firstName, lastName } = newUser

        if (await UserModel.findOne({ email })) {
            throw new UserError({
                httpStatus: 422,
                message: 'Email already in use'
            })
        }

        console.log({ newUser })

        const user = new UserModel({
            ...newUser,
            name: {
                first: firstName,
                last: lastName
            }
        })

        return user.save()
    },

    update: async (_user) => {
        /**
         * TODO : Verification of the _user
         * TODO : Sanity check
         */

        const existingUser = await findOne({ email: _user.email })
        return existingUser.update(_user)
    },

    verifyPassword: async ({ email, password }) => {
        const user = await findOne({ email })

        console.log({ user })

        if (user.comparedPassword(password)) {
            return user
        } else {
            throw new UserError({
                message: 'Incorrect password',
                httpStatus: 401
            })
        }
    },

    delete: (id) => {
        return UserModel.findByIdAndRemove(id)
    }
}

const findOne = async (filter) => {
    const existingUser = await UserModel.findOne(filter)

    if (!existingUser) {
        throw new UserError({
            message: 'User not found',
            httpStatus: 401
        })
    }

    return existingUser
}
