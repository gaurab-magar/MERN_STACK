const router = require('express').Router();
const authorController = require('../../controller/api/authorController');

router.route('/')
    .get(authorController.list)
    .post(authorController.store)
    .get( authorController.login)

router.delete(authorController.destroy);

module.exports = router;