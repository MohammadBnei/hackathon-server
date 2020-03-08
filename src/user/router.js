const UserController = require('./controller')

const router = require('express').Router()

router.get('/profile', (req, res) => {
    res.send(req.user)
})

router.get('/all', UserController.getAllUsers)

router.post('/profile', UserController.updateProfile)
router.post('/update', UserController.updateUser)

module.exports = router
