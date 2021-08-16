const router = require("express").Router();
const restricted = require('../auth/authenticate');
const adminOnly = require('../auth/adminOnly');
const controller = require('../controllers/book.controller');

router.post('/', restricted, adminOnly, controller.create);
router.get('/count', restricted, controller.count);
router.get('/', restricted, controller.findAll);
router.get('/:id', restricted, controller.findOne);
router.put('/:id', restricted, adminOnly, controller.update);
router.delete('/:id', restricted, adminOnly, controller.delete);

module.exports = router;
