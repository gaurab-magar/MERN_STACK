const router = require('express').Router();
const categoryController = require('../../controller/web/categoryController');

router.route('/')
    .get(categoryController.list)
    .post(categoryController.store)
router.delete('/:id', categoryController.destroy);
router.get('/create',categoryController.create)
.get('/delete/:id', categoryController.destroy)
.get('/list', categoryController.list)
.get('/login',categoryController.login)
module.exports = router;