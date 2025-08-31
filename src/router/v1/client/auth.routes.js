const express = require("express");
const { ClientModule } = require("../../../controller");
const {
  JoiValidateMiddleware: { joyValidate },
} = require("../../../middleware");
const { AuthValidate } = require("../../../validation/auth.validate");
const router = express();

const AuthCtrl = new ClientModule.authCtr1.AuthController();

router.post("/create", joyValidate(AuthValidate.register), async (req, res) => {
  const result = await AuthCtr1.register(req, res);
  return res.status(result.status).send(result);
});

module.exports = router;
