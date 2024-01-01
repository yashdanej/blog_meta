const { blogs } = require("../model/Blog");
const { users } = require("../model/user");
const { verifyToken } = require("../utils/verifyToken")

exports.Search = async (req, res, next) => {
    try {
        const text = req.params.text;
        const token = req.cookies.access_token;
        let authorId = token? await verifyToken(req, res, next, verifyUser = true): false;
        const getBlogs = await blogs.find().populate('author');
        const blogSearch = getBlogs.filter((blog) => blog.title.toLowerCase().includes(text.toLowerCase()));
        let getUsers = authorId? await users.find({_id: {$ne: authorId}}): await users.find();
        const userSearch = getUsers.filter((user) => 
            user.personal_info.username.toLowerCase().includes(text.toLowerCase())
            ||
            user.personal_info.fullname.toLowerCase().includes(text.toLowerCase())    
        )
        return res.status(200).json({blogs: blogSearch, users: userSearch});
    } catch (error) {
        next(error);
    }
}