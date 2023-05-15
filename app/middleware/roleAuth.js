const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");
function deteleAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "NOT AUTHORIZED" })
    }
    try {
        let token = req.headers.authorization.split(" ")[1]
        if (token) {
            jwt.verify(token, process.env.secretKey, function (err, decoded) {
                if (decoded.role == "admin") {
                    next();
                } else {
                    res.status(409).json({ message: "access failed, only users who are administrators can access" });
                }
            })

        } else {
            res.status(409).json({ message: "Token not found" })
        }
    } catch (err) {
        return res.status(401).json({ status: "fail", message: "Invalid Token,not Authorized" })
    }

}
module.exports = deteleAuth;



