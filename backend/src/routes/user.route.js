const router = require("express").Router();
const restricted = require('../auth/authenticate');
const adminOnly = require('../auth/adminOnly');
const selfOnly = require('../auth/selfOnly');
const controller = require('../controllers/user.controller');

router.post('/', controller.register);
router.get('/count', restricted, controller.count);
router.get('/', restricted, adminOnly, controller.findAll);
router.get('/:id', restricted, selfOnly, controller.findOne);
router.put('/:id', restricted, selfOnly, controller.update);

module.exports = router;
