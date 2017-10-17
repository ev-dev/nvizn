const router = require('express').Router()

router.use('/arxiv', require('./arxiv'))
router.use('/nature', require('./nature'))
router.use('/msAcademicGraph', require('./msAcademicGraph'))

module.exports = router