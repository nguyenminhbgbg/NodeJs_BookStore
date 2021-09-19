const Book = require('../model/Books');

const { mutipleMongooseToObject } = '../../until/mongoose';
class SiteController {
    // [GET] /
    index(req, res, next) {
        res.render('home');
    }

    // [GET] search

    search(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController();
