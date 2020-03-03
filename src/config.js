const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

module.exports = {
    jwt_secret: process.env.JWT_SECRET || 'unsafe_jwt_secret',
    mongoose: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost/mern'
    }
}
