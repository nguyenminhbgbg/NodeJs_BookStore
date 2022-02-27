const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const middlewareController = require('../app/controllers/middlewareController');

router.get('/login', siteController.login);

router.post('/logout', middlewareController.verifyTokenAndAdminAuth, siteController.logout);
router.post('/loginPost', siteController.loginPost);
router.get('/',middlewareController.verifyTokenAndAdminAuth, siteController.index);

module.exports = router;
