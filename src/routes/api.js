const express = require('express');
const router = express.Router();

const ApiController = require('../app/controllers/ApiController');

// api login, Register
router.get('/user', ApiController.user);
router.post('/register', ApiController.register);
router.post('/login', ApiController.login);
// admin book, chapter, genre
router.get('/book', ApiController.book);

router.get('/book/:genre', ApiController.bookBestSeller);
// router.get('/book', ApiController.book);
// router.get('/book', ApiController.book);

router.get('/chapter', ApiController.chapter);
router.get('/chapter/:id', ApiController.chapterWithID);

router.get('/genre', ApiController.genre);
router.get('/', ApiController.index);

module.exports = router;
