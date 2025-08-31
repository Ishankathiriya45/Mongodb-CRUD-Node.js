const path = require("path");
const { default: mongoose } = require("mongoose");
const clc = require("cli-color");

const mongoDbUrl = process.env["MONGODB_URL_" + process.env.RUN_MODE];

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log(
      clc.green.underline(`Database connection successfully`),
      clc.yellow.underline(`DB_NAME::${path.basename(mongoDbUrl)}`)
    );
  })
  .catch((error) => {
    console.error("Database connection error", error.message);
  });

const db = {
  UserModel: require("./user.model"),
  RoleModel: require("./role.model"),
  UserRoleModel: require("./userrole.model"),
  ProductModel: require("./product.model"),
};

module.exports = db;
