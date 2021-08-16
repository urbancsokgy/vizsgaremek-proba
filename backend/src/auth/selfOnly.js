module.exports = (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return res.sendStatus(401);
    }

    next();
};
