const { users } = require("../model/user");
const { createError } = require("../utils/error");
const bcrypt = require('bcryptjs');
const { verifyToken } = require("../utils/verifyToken");
const cloudinary = require('../utils/cloudinary');

exports.User = async (req, res, next) => {
    try {
        const username = req.params.username;
        if(!username){
            return next(createError(404, "User id not found!"));
        }else{
            const user = await users.findOne({'personal_info.username': username}).populate('blogs');
            !user? next(createError(200,  `${username} not found`)): res.status(200).json(user);
        }
    } catch (error) {
        next(error);
    }
}

exports.ChangePassword = async (req, res, next) => {
    try {
        const authorId = await verifyToken(req, res, next, verifyUser = true);
        const user = await users.findById(authorId);
        const { oldpassword, newpassword, reenterpassword } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(newpassword, salt);
        const isPasswordCorrect = bcrypt.compareSync(oldpassword, user.personal_info.password);
        if(isPasswordCorrect){
            if(newpassword === reenterpassword){
                await users.findByIdAndUpdate(authorId,
                {
                    'personal_info.password': hashpassword
                })
                res.status(200).json("Password changed successfully");
            }else{
                res.status(200).json("New password and confirm password didn't match")
            }
        }else{
            res.status(200).json("Incorrect password")
        }
    } catch (error) {
        next(error);
    }
}

exports.UpdateUser = async (req, res, next) => {
    try {
        const authorId = await verifyToken(req, res, next, verifyUser = true);
        console.log('authorId', authorId)
        if(!authorId){
            next(createError(401, "You are not authorized"));
        }else{
            let profile_img;
            const { fullname, bio, youtube, instagram, facebook, twitter, github, website } = req.body;
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "user"
                });
                profile_img = {
                  public_id: result.public_id,
                  url: result.secure_url
                }
              }
            const updateBlog = await users.findByIdAndUpdate(authorId, {$set: 
                {
                    'personal_info.fullname': fullname,
                    'personal_info.profile_img': profile_img,
                    'personal_info.bio': bio,
                    'social_links.youtube': youtube,
                    'social_links.instagram': instagram,
                    'social_links.facebook': facebook,
                    'social_links.twitter': twitter,
                    'social_links.github': github,
                    'social_links.website': website,
                }
            },
            {
                new: true
            })
            res.status(200).json(updateBlog);
        }
    } catch (error) {
        next(error);
    }
}