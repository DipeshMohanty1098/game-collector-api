const admin = require('../config/firebase-config')

class MiddleWare {
    async decodeToken(req, res, next) {
        if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1] 
        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (decodeValue) {
                return next();
            }
            return res.status(400).json({ message: "Unathorized, please login again." })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: "Internal Error" });
        }
        } else {
            res.status(400).json({message: "Bad Request, Please login in again"})
        }
    }
}

module.exports = new MiddleWare();