const { responseMsg } = require("../response");

const node_env = process.env.RUN_MODE;

const joyValidate = (schema) => {
    return (req, res, next) => {
        let { error } = schema.validate(req.body || {})

        if (!error) {
            next()
        } else {
            let { details } = error;
            let message = details.map((i) => i.message).join(",")

            if (node_env == 'DEV' || node_env == 'LOCAL') {
                return res.send(responseMsg.valiidationError(0, message))
            } else {
                return res.send(responseMsg.valiidationError(0, message))
            }
        }
    }
}

module.exports = {
    joyValidate,
}