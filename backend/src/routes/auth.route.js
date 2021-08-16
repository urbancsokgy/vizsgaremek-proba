const router = require("express").Router();
const authHandler = require('../auth/authHandler');

router.post('/login', authHandler.login);
router.post('/refresh', authHandler.refresh);
router.post('/logout', authHandler.logout);

module.exports = router;