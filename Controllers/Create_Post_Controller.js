const { Post_Schema } = require("../Models/Post_Schema");

const Create_Post_Controller = async (req,res) => {
    try {
        const user = req.user;
        const body = req.body;

        const create_Post = await Post_Schema.create({
            ...body,user_id: user._id
        })
        return res.json({success: true, data:create_Post})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", error:error.message})
          
    }
}

module.exports = {Create_Post_Controller}