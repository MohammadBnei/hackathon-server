const { Schema, model } = require('mongoose')

// Define the model
const TeamSchema = new Schema({
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    name: {
        type: String,
        unique: true
    }
    /**
     * TODO: update with projects
     */
})

// Export the model
module.exports = model('Team', TeamSchema)
