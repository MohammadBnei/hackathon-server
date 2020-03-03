const UserController = require('./controller')

const router = require('express').Router()

router.get('/profile', (req, res) => {
    res.send(req.user)
})

router.post('/profile', UserController.updateProfile)

module.exports = router
