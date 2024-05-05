const { User_Schema } = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt_token = require("jsonwebtoken");
const SignUP_Controllers = async (req,res) => {
   try {
      const body = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hash_password = bcrypt.hashSync(body.password,salt)
      const create_user = await User_Schema.create({
      ...body,password:hash_password
      })

      res.json({data: create_user, message:"Data has been successfully sent!"})
      //  res.json({body,hash_password})

   } catch (error) {
      res.status(500).json({message:"Internal Server Error!", error:error.message})
   }
}


const Login_Controller = async (req,res) => {
    try {
        const body = req.body;

        const find_user = await User_Schema.findOne({
            email:body.email
        })
        if(find_user === null){
            return res.status(402).json({success: false, message: "Invalid Credentials"})
        }
        const is_password_valid = await bcrypt.compare(body.password,find_user.password);

        if(is_password_valid === false){
            return res.status(402).json({success: false, message: "Invalid Credentials"})
        }

        const jwt_payload = {
            user_id : find_user._id
        }
        const JWT_token = jwt_token.sign(jwt_payload,process.env.JWT_SECRECT_KEY,{expiresIn: "1d"})

        const response_data = {
            ...find_user.toObject()
        }

        res.cookie("auth_token",JWT_token)
        delete response_data.password;
        res.json({success: true ,message:"LoggedIn Successfully!", data:response_data, auth_token: JWT_token})

    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", error:error.message})
    }
}

const Check_user_Controller = async (req,res) => {

    try {
        const user = req.user;
        return res.json({data: user})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", error:error.message})
        
    }
} 

module.exports = {Login_Controller,SignUP_Controllers,Check_user_Controller}