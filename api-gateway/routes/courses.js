const express = require('express');
const router = express.Router();
const coursesHandler = require('./handler/courses');

const verifyToken = require('../middlewares/verifyToken');
const havePermission = require('../middlewares/permission');

router.get('/', coursesHandler.getAll);
router.get('/:id', coursesHandler.get);

router.post('/', verifyToken, havePermission('admin'), coursesHandler.create);
router.put('/:id', verifyToken, havePermission('admin'), coursesHandler.update);
router.delete('/:id', verifyToken, havePermission('admin'), coursesHandler.destroy);

module.exports = router;
