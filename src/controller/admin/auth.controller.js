const db = require("../../models");
const { responseMsg } = require("../../response");
const { BcryptUtil, JwtUtil } = require("../../util");

class AuthController {
  constructor() {}

  async register(req) {
    try {
      const { name, email, password } = req.body;

      const hashPassword = BcryptUtil.bcryptPassword(password);

      const getEmail = await db.UserModel.findOne({ email: email });

      if (getEmail) {
        return responseMsg.valiidationError(0, "email alraedy exist");
      }

      const userData = {
        name: name,
        email: email,
        password: hashPassword,
      };

      const detail = await db.UserModel.create(userData);

      if (detail) {
        const tokenData = {
          id: detail._id,
          email: detail.email,
          role_name: "admin",
        };

        const getRole = await db.RoleModel.findOne({
          name: "admin",
        });

        await db.UserRoleModel.create({
          roleId: getRole._id,
          userId: detail._id,
        });

        const token = JwtUtil.jwtSign(tokenData);

        return responseMsg.successCode(1, "Success", token);
      }
    } catch (error) {
      return responseMsg.serverError(0, "Failed", error.message);
    }
  }

  async login(req) {
    try {
      const { email, password } = req.body;

      const getUser = await db.UserModel.findOne({ email: email });

      const checkPassword = BcryptUtil.bcryptCompare(
        password,
        getUser.password
      );

      if (getUser && checkPassword) {
        const getUserRole = await db.UserRoleModel.findOne({
          userId: getUser._id,
        }).populate("roleId");

        const tokenData = {
          email: getUser.email,
          role_name: getUserRole.roleId.name,
        };

        const token = JwtUtil.jwtSign(tokenData);

        return responseMsg.successCode(1, "Success", token);
      }
    } catch (error) {
      return responseMsg.serverError(0, "Failed", error.message);
    }
  }
}

module.exports = {
  AuthController,
};
