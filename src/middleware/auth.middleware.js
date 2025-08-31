const { responseMsg } = require("../response");
const { CryptoUtil, JwtUtil } = require("../util");

const checkRequest = async (req) => {
  const { requesttoken } = req.headers;

  if (!requesttoken) {
    return false;
  }

  let plainText = CryptoUtil.decryptData(requesttoken);
  if (
    plainText.trim().toLowerCase() !==
    process.env["ENCREPT_MESSAGE_" + process.env.RUN_MODE]
  ) {
    return false;
  } else {
    return true;
  }
};

const checkRequestToken = async (req, res, next) => {
  checkRequest(req).then((result) => {
    if (result == true) {
      next();
    }
    if (result == false) {
      return res.status(403).send({
        status: 403,
        ResponseCode: 0,
        success: false,
        message: "Forbidden",
      });
    }
  });
};

const bearerToken = async (req) => {
  let { authorization } = req.headers;

  if (!authorization) {
    return {
      valid: false,
      message: "No Token",
    };
  }

  const part = authorization.split(" ");
  const token = part[1];
  const tokenLength = token.split(".");

  if (part.length != 2 && tokenLength.length != 3 && !/Bearer/i.test(part[0])) {
    return {
      valid: false,
      message: "Token error",
    };
  }

  try {
    const decoded = JwtUtil.jwtVerify(token);
    req.headers.payload = decoded;
    return {
      valid: true,
    };
  } catch (error) {
    return {
      valid: false,
      message: "Token error",
    };
  }
};

const checkAuth = async (req, res, next, role) => {
  try {
    let checkBearerToken = await bearerToken(req);
    let requestToken = await checkRequest(req);

    if (checkBearerToken.valid == true && requestToken == true) {
      const {
        payload: { role_name },
      } = req.headers;

      if (role.includes(role_name)) {
        next();
      } else {
        return res
          .status(500)
          .send(
            responseMsg.serverError(
              0,
              checkBearerToken.message
                ? checkBearerToken.message
                : "Invalid token"
            )
          );
      }
    } else {
      return res
        .status(500)
        .send(
          responseMsg.serverError(
            0,
            checkBearerToken.message
              ? checkBearerToken.message
              : "Invalid token"
          )
        );
    }
  } catch (error) {
    return res.send(responseMsg.serverError(0, "Failed", error.message));
  }
};

const productAuth = async (req, res, next) => {
  return checkAuth(req, res, next, ["admin"]);
};

module.exports = {
  checkRequestToken,
  productAuth,
};
