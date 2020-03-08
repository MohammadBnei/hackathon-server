const TeamController = require('./controller')
const { roleCheck } = require('../api/middlewares')

const router = require('express').Router()

router.get('/:teamId', TeamController.getTeam)

router.post('/', roleCheck(['leader', 'agency']), TeamController.updateTeam)

module.exports = router
