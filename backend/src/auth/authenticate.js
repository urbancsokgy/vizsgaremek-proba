const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // Bearer lskdfjlkdsjfldsjflsdfj
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, userData) => {
            if (!err) {
                const user = await UserModel.findOne({ email: userData.email });
                if (user) {
                    req.user = user;
                    return next();
                }
            }

            return res.sendStatus(403);
        });
    } else {
        res.sendStatus(401);
    }
};
