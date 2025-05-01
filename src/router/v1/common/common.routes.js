const express = require('express');
const { CommonModule } = require('../../../controller');
const router = express()

const CommonCtr1 = new CommonModule.commonCtr1.CommonController()

router.post('/create',
    async (req, res) => {
        const result = await CommonCtr1.createRole(req, res)
        return res.status(result.status).send(result)
    }
)

module.exports = router;