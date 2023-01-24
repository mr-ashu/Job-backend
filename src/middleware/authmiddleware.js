const jwt = require('jsonwebtoken')

const authMiddlewares = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        res.status(403).send({
            message: "You're not authorized for this action"
        })
        return
    }
    const decoded = jwt.verify(token, "SECRET", function (err, decoded) {
        if (err) {
            res.status(403).send({
                message: "You're not authorized for this action"
            })
        } else {
            return decoded
        }
    })

    if (decoded) {
        req.body.UserID = decoded.UserId
        next()
    } else {
        res.status(403).send({
            message: "You're not authorized for this action"
        })
    }


}

module.exports =  authMiddlewares 