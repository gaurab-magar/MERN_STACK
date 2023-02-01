const jwt = require('jsonwebtoken');
const User = require('../model/model.user');

const verifyAuth = async (req, res, next) => {
    if(req.cookies){
        const token = req.cookies.token;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if(err) return res.sendStatus(403);
            try{
                await User.findOne({email: user.email});
                // if(user.role === 'admin'){
                    req.user = user;
                    next();
                // }
            }catch(err){
                return res.sendSatatus(403);
            }
        });
    }else{
        return res.sendStatus(401);
    }
}

module.exports = verifyAuth;