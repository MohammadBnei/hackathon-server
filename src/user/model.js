const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const { roles, competences } = require('../util/enums')

// Define the model
const Schema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
    status: {
        approved: Boolean,
        role: {
            type: String,
            enum: roles,
            lowercase: true
        },
        competences: [{
            type: String,
            enum: competences,
            lowercase: true
        }]
    },
    capacities: [{
        type: String,
        lowercase: true
    }],
    externalLinks: [{
        type: String
    }]
})

Schema.pre('save', function (next) {
    // get access to user model, then we can use user.email, user.password
    const user = this

    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err) }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err) }

            user.password = hash
            next()
        })
    })
})

// Make use of methods for comparedPassword
Schema.methods.comparedPassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password)
}

// Export the model
module.exports = mongoose.model('User', Schema)
