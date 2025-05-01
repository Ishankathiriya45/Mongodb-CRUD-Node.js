const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        userType: {
            type: String,
            enum: ['1', '2', '3'],
            default: '3',
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', user, 'users')