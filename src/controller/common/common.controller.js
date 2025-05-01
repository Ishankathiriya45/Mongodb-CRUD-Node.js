const db = require("../../models");
const { responseMsg } = require("../../response");

class CommonController{
    constructor(){}

    async createRole(req){
        const {name} = req.body;

        const deteil = await db.RoleModel.create({name})

        if(deteil){
            return responseMsg.successCode(1, 'Success', deteil)
        }
    }
}

module.exports = {
    CommonController
}