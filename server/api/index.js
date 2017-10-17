const router = require('express').Router()

router.use('/nature', require('./nature'))

module.exports = router