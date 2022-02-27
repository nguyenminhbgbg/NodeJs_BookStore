const Chapter = require('../model/Chapters');
const Book = require('../model/Books');
const Genres = require('../model/Genres');
const User = require('../model/Users');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('api');
    }

    // [GET] detail api/book
    book(req, res, next) {
        Book.find({})
            .then((books) => {
                res.json(books);
            })
            .catch(next);
    }

    bookBestSeller(req, res, next) {
        Book.find({genre: req.params.genre})
            .then((books) => {
                res.json(books);
            })
            .catch(next);
    }
    // [GET] detail api/chapter
    chapter(req, res, next) {
        Chapter.find({})
            .then((chapters) => {
                res.json(chapters);
            })
            .catch(next);
    }
    
    // [GET] detail api/chapter
    chapterWithID(req, res, next) {
        Chapter.find({bookId: req.params.id})
            .then((chapters) => {
                res.json(chapters);
            })
            .catch(next);
    }

    // [GET] detail api/genre
    genre(req, res, next) {
        Genres.find({})
            .then((genre) => {
                res.json(genre);
            })
            .catch(next);
    }

    user(req, res, next) {
        User.find({})
            .then((users) => {
                res.json(users);
            })
            .catch(next);
    }
    // [POST]  api/register
    register(req, res, next) {
        bcrypt.hash(req.body.password, 10 , function(err, hashedPass){
            if(err){
                res.json({
                    error: err
                })
            }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
        })
        user.save()
            .then( user => { 
                res.json({
                    message: 'Thêm tài khoản thành công!'
                })
            })
            .catch(error => {
                res.json({
                    message: 'Xảy ra lỗi, vui lòng thử lại!'
                })
            })
        })
    }

    login(req, res, next) {
        var username = req.body.username;
        var password = req.body.password; 
        User.findOne({$or: [{email:username},{phone:username}]})
        .then(user =>{
            if(user){
                bcrypt.compare(password, user.password, function(err, result){
                    if(err){
                        res.json({
                            error: err
                        })
                    }
                    if(result){
                        let token = jwt.sign({name: user.name, email: user.email}, 'verySecretValue', {expiresIn: '1h'})
                        const {password, ...others} = user._doc;
                        res.json({
                            message: 'Đăng nhập thành công!',
                            token,
                            ...others
                        })
                    }else{
                        res.json({
                            message: 'Mật khẩu không đúng, vui lòng thử lại!'
                        })
                    }
                })
            }else{
                res.json({
                    message: 'không tìm thấy thông tin tài khoản!'
                })
            }
        })
    }
}
module.exports = new NewsController();
