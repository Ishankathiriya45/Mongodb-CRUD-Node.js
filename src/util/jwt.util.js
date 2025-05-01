const jwt = require('jsonwebtoken')
const accessSecreteKey = process.env['ACCESS_SECRETE_KEY_' + process.env.RUN_MODE]

module.exports = {
    jwtSign: (data)=>{
        return jwt.sign(data, accessSecreteKey, {expiresIn:'3d'})
    },

    jwtVerify: (data)=>{
        return jwt.verify(data, accessSecreteKey)
    },
}