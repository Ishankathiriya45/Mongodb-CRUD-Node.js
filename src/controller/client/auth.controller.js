const db = require("../../models");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { responseMsg } = require("../../response");
const { JwtUtil } = require("../../util");
const accessSecreteKey = process.env['ACCESS_SECRETE_KEY_' + process.env.RUN_MODE]

class AuthController {
    constructor() { }

    async register(req) {
        try {
            const { name, email, password } = req.body;

            const hashPassword = await bcrypt.hash(password, 10)

            const getEmail = await db.UserModel.findOne({ email: email })

            if (getEmail) {
                return responseMsg.valiidationError(0, 'email alraedy exist')
            }

            const userData = {
                name: name,
                email: email,
                password: hashPassword,
            }

            const detail = await db.UserModel.create(userData)

            if (detail) {
                const tokenData = {
                    id: detail._id,
                    email: detail.email,
                    role_name: 'client',
                }

                const getRole = await db.RoleModel.findOne({
                    name: 'client',
                })

                await db.UserRoleModel.create({
                    roleId: getRole._id,
                    userId: detail._id,
                })

                const token = JwtUtil.jwtSign(tokenData)

                return responseMsg.successCode(1, 'Success', token)
            }
        } catch (error) {
            return responseMsg.serverError(0, 'Failed', error.message)
        }
    }
}

module.exports = {
    AuthController,
}