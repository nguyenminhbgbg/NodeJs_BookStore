const Chapter = require('../model/Chapters');
const Book = require('../model/Books');
const Genres = require('../model/Genres');
const User = require('../model/Users');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { mutipleMongooseToObject } = '../../until/mongoose';
class SiteController {
    // [GET] /
    index(req, res, next) {
        res.render('home');
    }

    // [GET] search
    login(req, res) {
        res.render('login');
    }

    generateRefreshToken (user) {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
      }
    
    loginPost(req, res, next) {
        
        var username = req.body.username;
        var password = req.body.password; 
        User.findOne({$or: [{email:username},{password:password}]})
        .then(user =>{
            if(user ){
                bcrypt.compare(password, user.password, function(err, result){
                    if(err){
                        res.json({
                            error: err
                        })
                    }
                    if(result){
                        if(user.isAdmin){
                            const accessToken = jwt.sign(
                                {
                                    id: user._id,
                                    admin: user.isAdmin,
                                },
                                "verySecretValue",
                                { expiresIn: "7d" }
                            );
                            const refreshToken = jwt.sign(
                                {
                                    id: user._id,
                                    admin: user.isAdmin,
                                },
                                "verySecretValue",
                                { expiresIn: "365d" }
                            );
                            res.cookie("refreshToken", refreshToken, {
                                httpOnly: true,
                                secure: false,
                                path: "/",
                                sameSite: "strict",
                            });
                            res.cookie("isAdmin", user.isAdmin, {
                                httpOnly: true,
                                secure: false,
                                path: "/",
                                sameSite: "strict",
                            });
                            const {password, ...others} = user._doc;
                               
                            // res.status(200).json({ user: others, token: accessToken });         
                            // res.render('home', { user: others, token: accessToken })
                            res.redirect('/');
                        }
                        else{
                            res.json({
                                message: 'Tài khoản chưa được cấp quyền admin, vui lòng thử lại!'
                            })
                        }
                        
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
    logout(req, res, next){
        res.clearCookie('refreshToken');
        res.clearCookie('isAdmin');
        res.redirect('/login');
        // res.status(200).json("LogOut Successful!")
    }
}
module.exports = new SiteController();
