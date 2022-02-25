const jwt = require('jsonwebtoken');

const middlewareController = {
    
    // verifyToken 
    verifyToken: (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken) { 
            jwt.verify(refreshToken, "verySecretValue", (err, user)=>{
                if(err) {
                    // res.status(403).json("Token is not valid!!")
                    res.redirect('/login');
                }
                req.user = user;
                next();
            })
        }
        else{
            // res.status(401).json("You are not authenticated!!")
            res.redirect('/login');
        }
    },

    verifyTokenAndAdminAuth: (req, res, next)=>{
        const isAdmin = req.cookies.isAdmin;
        middlewareController.verifyToken(req, res , ()=>{
            if(isAdmin){
                next();
            }
            else{
                // res.status(403).json("Tài khoản chưa được cấp quyền để truy cập!")
                res.redirect('/login');

            }
        })
    }
}

module.exports = middlewareController;