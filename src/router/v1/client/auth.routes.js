const express = require('express');
const { ClientModule } = require('../../../controller');
const { joyValidate } = require('../../../middleware/joiValidate.service');
const { AuthValidate } = require('../../../validation/auth.validate');
const router = express()

const AuthCtr1 = new ClientModule.authCtr1.AuthController()

router.post('/create',
    joyValidate(AuthValidate.register),
    async (req, res) => {
        const result = await AuthCtr1.register(req, res)
        return res.status(result.status).send(result)
    }
)

module.exports = router;