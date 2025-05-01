const { responseMsg } = require('../response');
const { CryptoUtil, JwtUtil } = require('../util');

const bearerToken = async (req) => {
    let { authorization } = req.headers;

    if (!authorization) {
        return {
            valid: false,
            message: 'No Token',
        }
    }

    const part = authorization.split(" ")
    const token = part[1];
    const tokenLength = token.split(".")

    if (part.length != 2 && tokenLength.length != 3 && !/Bearer/i.test(part[0])) {
        return {
            valid: false,
            message: 'Token error',
        }
    }

    try {
        const decoded = JwtUtil.jwtVerify(token)
        req.headers.payload = decoded;
        return {
            valid: true,
        }
    } catch (error) {
        return {
            valid: false,
            message: 'Token error',
        }
    }
}

const requestToken = async (req) => {
    const { requesttoken } = req.headers;

    if (!requesttoken) {
        return false;
    }

    let plainText = CryptoUtil.decryptData(requesttoken)

    if (!plainText) {
        return false;
    }

    let requesstMessage = plainText.trim().toLowerCase()

    const cryptoMessage = process.env['ENCREPT_MESSAGE_' + process.env.RUN_MODE]
    requesstMessage == cryptoMessage;
    return true;
}

const checkAuth = async (req, res, next, role) => {
    try {
        let checkBearerToekn = await bearerToken(req)

        if (checkBearerToekn.valid == true || (await requestToken(req) == true)) {
            const { payload: { role_name } } = req.headers;

            if (role.includes(role_name)) {
                next()
            } else {
                return res.status(500).send(responseMsg.serverError(
                    0,
                    checkBearerToekn.message ? checkBearerToekn.message : 'Invalid token'
                ))
            }
        } else {
            return res.status(500).send(responseMsg.serverError(
                0,
                checkBearerToekn.message ? checkBearerToekn.message : 'Invalid token'
            ))
        }
    } catch (error) {
        return res.send(responseMsg.serverError(0, 'Failed', error.message))
    }
}

const productAuth = async (req, res, next) => {
    return checkAuth(req, res, next, ['admin'])
}

module.exports = {
    productAuth,
}
