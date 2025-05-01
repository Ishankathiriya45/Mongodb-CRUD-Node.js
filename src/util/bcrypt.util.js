const bcrypt = require('bcrypt')

module.exports = {
    bcryptPassword: async (password) => {
        return await bcrypt.hash(password, 10)
    },

    bcryptCompare: async (password, data) => {
        return await bcrypt.compare(password, data)
    },
}