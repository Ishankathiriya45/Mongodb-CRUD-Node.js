const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const role = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("roles", role, "roles");
