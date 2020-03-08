const TeamService = require('./service')

module.exports = {
    createTeam: (req, res, next) => {
        const { name } = req.body

        if (!name) {
            res.status(401).send('Team must have a valid name')
        }

        TeamService.create(name)
            .then(team => {
                res.status(201).send({
                    success: true,
                    id: team.id,
                    name: team.name
                })
            })
    },

    getTeam: (req, res, next) => {
        const { teamId } = req.params

        TeamService.findById(teamId)
            .then(team => res.status(201).send({
                team
            }))
            .catch(err => res.status(err.httpStatus || 401).send(err.message || 'Team not found'))
    },

    updateTeam: (req, res, next) => {

    }

}
