const express = require('express')
const router = express()

router.use("/admin", require('./admin'))
router.use("/common", require('./common'))
router.use("/client", require('./client'))

module.exports = router;