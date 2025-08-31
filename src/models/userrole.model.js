const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const userrole = new Schema(
  {
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "roles",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("userroles", userrole, "userroles");
