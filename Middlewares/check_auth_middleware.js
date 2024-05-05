const { User_Schema } = require("../Models/UserModel");
const jwt_token = require('jsonwebtoken')
const Check_auth_middleware = async (req,res,next) => {

    try {
        const req_cookie = req.cookies.auth_token;
        console.log(req_cookie);
        if(!req_cookie){
            return res.json({success: false, message: "LogIn required!"})
        }
        const verify_token = jwt_token.verify(req_cookie,process.env.JWT_SECRECT_KEY);

        if(!verify_token){
            return res.json({success: false, message: "LogIn required!"})
        }

        const user_id = verify_token.user_id
        const find_user = await User_Schema.findById(user_id).select("-password");


        req.user = find_user
        next()
        // return res.json({success: true, data: find_user })
        // return res.json({success: true })

        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", error:error.message})
        
    }
} 
module.exports = {Check_auth_middleware}