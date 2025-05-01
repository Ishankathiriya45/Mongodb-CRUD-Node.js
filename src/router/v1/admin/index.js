const express = require('express')
const router = express()

router.use("/auth", require('./auth.routes')),
router.use("/product", require('./product.routes')),

module.exports = router;