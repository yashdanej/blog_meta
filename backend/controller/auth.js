const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../model/user');
const { createError } = require('../utils/error');

exports.Register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new users({
            personal_info:{
                fullname: req.body.fullname,
                email: req.body.email,
                password: hash,
                username: req.body.username,
                profile_img: {public_id: '1', url: 'https://res.cloudinary.com/dbb3q0p82/image/upload/v1694156664/profile_jsgyay.png'}
            }
        });

        await newUser.save();
        res.status(200).json("User has been created");
    } catch (error) {
        next(error)
    }
}

exports.Login = async (req, res, next) => {
    try {
        const user = await users.findOne({'personal_info.username': req.body.username});
        if(!user)
            return next(createError(404, "User not found!"));

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.personal_info.password);
        if(!isPasswordCorrect)
            return next(createError(400, "Wrong password or username"));

        const token = jwt.sign({id: user._id, email: user.personal_info.email, username: user.personal_info.username}, process.env.SECRET_KEY);
        let { password, ...otherDetails } = user._doc.personal_info;
        let { _id } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({...otherDetails, _id, token});
    } catch (error) {
        next(error)
    }
}

exports.Logout = async (req, res) => {
    try {
        res.cookie("access_token", "", {
            httpOnly: true,
            expires: new Date(0)
        }).status(200).json({ message: "Logout successful" });
    } catch (error) {
        next(error)
    }
}