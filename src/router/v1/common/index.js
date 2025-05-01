const express = require('express')
const router = express()

router.use("/role", require('./common.routes'))

module.exports = router;