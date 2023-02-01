const router = require('express').Router();
const bookController = require('../../controller/web/bookController');

router.route('/')
    .get(bookController.index)
    .post(bookController.store)
    .get('/login',bookController.login)
router.get('/create', bookController.create)

module.exports = router;