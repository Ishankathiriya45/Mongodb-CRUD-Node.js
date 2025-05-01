const Crypto = require('node:crypto')
const { Buffer } = require('node:buffer')

const password = process.env['ENCREPTE_PASSWORD_' + process.env.RUN_MODE]
const algorithm = process.env['CRYPTO_ALGORITHM_' + process.env.RUN_MODE]
const key = Crypto.scryptSync(password, "salt", 32)
const iv = Buffer.alloc(16, 0)

module.exports = {
    encryptData: (data) => {
        const cipher = Crypto.createCipheriv(algorithm, key, iv)
        let encrypt = cipher.update(data, "utf-8", "hex")
        encrypt += cipher.final("hex")
        console.log({ encrypt })
        return encrypt;
    },

    decryptData: (data) => {
        const cipher = Crypto.createDecipheriv(algorithm, key, iv)
        let decrypt = cipher.update(data, "hex", "utf-8")
        decrypt += cipher.final("utf-8")
        return decrypt;
    }
}