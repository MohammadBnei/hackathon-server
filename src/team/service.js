const TeamModel = require('./model')
const TeamError = require('./error')
const UserService = require('../user/service')

const { isValid } = require('mongoose').Types.ObjectId

const findOne = async (filter) => {
    const existingTeam = await TeamModel.findOne(filter)

    if (!existingTeam) {
        throw new TeamError({
            message: 'Team not found',
            httpStatus: 401
        })
    }

    return existingTeam
}

const findById = async (id) => {
    let team

    if (isValid(id)) {
        team = await TeamModel.findById(id)
    } else {
        team = await findOne({ name: id })
    }

    if (!team) {
        throw new TeamError({
            message: 'Cannot find team',
            httpStatus: 401
        })
    }

    return team
}

module.exports = {
    findById: findById,
    findOne: findOne,
    create: async (name) => {
        /**
         * TODO : Verification of the _team
         * TODO : Sanity check
         */

        if (await TeamModel.findOne({ name })) {
            throw new TeamError({
                httpStatus: 422,
                message: 'Name already in use'
            })
        }

        const team = new TeamModel({
            name
        })

        return team.save()
    },

    update: async (_team) => {
        /**
         * TODO : Verification of the _team
         * TODO : Sanity check
         */

        const existingTeam = await findOne({ name: _team.name })
        return existingTeam.update(_team)
    },

    delete: (id) => {
        return TeamModel.findByIdAndRemove(id)
    },

    addMember: (teamId, memberId) => {
        const [team, member] = Promise.all([findById(teamId), UserService.findById(memberId)])

        team.members.push(member)
        return team.save()
    }
}
