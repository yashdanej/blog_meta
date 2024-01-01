const { verifyToken } = require("../utils/verifyToken")
const cloudinary = require('../utils/cloudinary');
const { users } = require("../model/user");
const { createError } = require("../utils/error");
const { blogs } = require("../model/Blog");
const { comments } = require("../model/Comment");

exports.CreateBlog = async (req, res, next) => {
    try {
        const author = await verifyToken(req, res, next, verifyUser=true);
        if(!author)
            next(createError(404, "User not found"));

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "blogs"
        });
        let tags = req.body.tags.split(",");
        const newBlog = new blogs({
            title: req.body.title,
            banner: {
                public_id: result.public_id,
                url: result.secure_url
            },
            des: req.body.des,
            content: req.body.content,
            tags: tags,
            author: author,
            draft: req.body.draft || false
        });
        await newBlog.save();
        const user = await users.findById(author);
        if(!user)
            next(createError(404, "User not found"));
        user.blogs.push(newBlog);
        user.account_info.total_posts += 1;
        await user.save();
        res.status(200).json(newBlog);
    } catch (error) {
        next(error)
    }
}

exports.FeedBlogs = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        let author = '';
        if(token){
            author = await verifyToken(req, res, next, verifyUser=true);
        }
        const isAuthor = author?
        [{draft: false}, {author: {$ne: author}}]
        :[{draft: false}]
        const feedBlogs = await blogs.find({$and: isAuthor}).sort({publishedAt: -1}).populate('author');
        res.status(200).json(feedBlogs);
    } catch (error) {
        next(error)
    }
}

exports.Blog = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(!id){
            return next(createError(404, "Blog id is not provided"));
        }
        const blog = await blogs.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        next(error)
    }
}

exports.UpdateBlog = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(!id)
            return next(createError(404, "Blog id is not provided"));
        const blog = await blogs.findById(id);
        if(!blog)
            return next(createError(404, "Blog not found"));
        let result;
        let title, banner, des, content, category, tags, draft;
        if(req.body.title){
            title = req.body.title; 
        }
        if(req.file){
            result = await cloudinary.uploader.upload(req.file.path, {
                folder: "blogs"
            });
            banner = {
                public_id: result.public_id,
                url: result.secure_url
            }
        }
        if(req.body.des){
            des = req.body.des;
        }
        if(req.body.content){
            content = req.body.content
        }
        if(req.body.category){
            category = req.body.category;
        }
        if(req.body.tags){
            tags = req.body.tags.split(",");
        }
        if(req.body.draft){
            draft = req.body.draft;
        }
        const updatedBlog = await blogs.findByIdAndUpdate(id, {$set: {title: title, banner: banner, des: des, content: content, category: category, tags: tags, draft: draft}}, {new: true})
        res.status(200).json(updatedBlog);
    } catch (error) {
        next(error)
    }
}

exports.DeleteBlog = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return next(createError(404, "Blog id is not provided"));
        }
        const authorId = await verifyToken(req, res, next, verifyUser = true);
        const blog = await blogs.findByIdAndDelete({ _id: id, author: authorId });
        if (!blog) {
            return res.status(404).json("This blog does not belong to you or doesn't exist.");
        }
        await users.findByIdAndUpdate(authorId, {
            $pull: {blogs: id},
            $inc: {'account_info.total_posts': -1}
        });
        await comments.deleteMany({blog_id: id});
        res.status(200).json("Blog deleted successfully.");
    } catch (error) {
        next(error);
    }
};

exports.AddComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(!id){
            return next(createError(404, "Blog id is not provided"));
        }
        const commentId = req.params.commentId;
        const authorId = await verifyToken(req, res, next, verifyUser = true);
        const { comment, isReply } = req.body
        const newComment = new comments({
            blog_id: id,
            comment: comment,
            commented_by: authorId,
            isReply: isReply?isReply:false
        });
        if(isReply){
            if(!commentId){
                return next(createError(404, "Comment id is not provided"));
            }
            newComment.parent = commentId
        }
        await newComment.save();
        if(isReply){
            await comments.findByIdAndUpdate(commentId, {$push: {children: newComment._id}})
        }
        await blogs.findByIdAndUpdate(id,
            {
                $inc: {
                    'activity.total_comments': 1
                },
                $push: {
                    comments: newComment
                }
            },
            { new: true }
        );
        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
}

exports.Comments = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return next(createError(404, "Blog id is not provided"));
        }
        const topLevelComments = await comments.find({ blog_id: id, isReply: false }).sort({commentedAt: -1}).populate('commented_by').populate('blog_id');
        await populateChildren(topLevelComments);
        res.status(200).json(topLevelComments);
    } catch (error) {
        next(error);
    }
};

const populateChildren = async (comments) => {
    for (const comment of comments) {
        await comment.populate('children')
        await comment.populate('commented_by');
        await comment.populate('blog_id');
        if (comment.children.length > 0) {
            await populateChildren(comment.children);
        }
    }
};


exports.LikeBlog = async (req, res, next) => {
    try {
        const id = req.params.id;
        const authorId = await verifyToken(req, res, next, verifyUser = true);
        if(!id){
            return next(createError(404, "Blog id is not provided"));
        }
        const blog = await blogs.findOne({_id: id, 'activity.total_likes': authorId});
        if(blog){
            await blogs.findByIdAndUpdate(id, {
                $pull: {'activity.total_likes': authorId}
            })
            const totalLikes = await blogs.findOne({_id: id}, {_id:0, 'activity.total_likes':1})
            return res.status(200).json({message: 'Like remove!', totalLikes: totalLikes.activity.total_likes.length>0?totalLikes.activity.total_likes.length:0})
        }else{
            await blogs.findByIdAndUpdate(id, {
                $push: {'activity.total_likes': authorId}
            })
            const totalLikes = await blogs.findOne({_id: id}, {_id:0, 'activity.total_likes':1})
            return res.status(200).json({message:'Like added!', totalLikes: totalLikes.activity.total_likes.length>0?totalLikes.activity.total_likes.length:0})
        }
    } catch (error) {
        next(error);
    }
}

exports.ViewBlog = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(!id){
            return next(createError(404, "Blog id is not provided"));
        }
        const authorId = await verifyToken(req, res, next, verifyUser = true);
        const blog = await blogs.findOne({_id: id, 'activity.total_reads': authorId});
        if(blog){
            return res.status(200).json('Already viewed');
        }else{
            const myBlog = await blogs.findByIdAndUpdate(id,{
                $push: {'activity.total_reads': authorId}
            })
            await users.findByIdAndUpdate({_id: myBlog.author},{
                $inc: {'account_info.total_reads': 1}
            })
        }
        return res.status(200).json('View added');
    } catch (error) {
        next(error);
    }
}

exports.SimilarBlog = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(!id){
            return next(createError(404, "Blog id is not provided"));
        }
        const blog = await blogs.findById(id);
        const list = await Promise.all(blog.tags.map((tag) => {
            return blogs.find({_id: {$ne:id}, tags: tag});
        }));
        return res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}

exports.TagsBlog = async (req, res, next) => {
    console.log('wdwdwd')
    try {
        const tags = req.body.tags.split(",");
        const list = await blogs.find({ tags: { $in: tags } }).populate('author');
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}

exports.DeleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const id = req.params.id;
        if(!commentId){
            return next(createError(404, "Comment id is not provided"));
        }
        const comment = await comments.findById(commentId);
        if(!comment){
            return next(createError(404, "comment is not found"));
        }else{
            const deleteCount = await comments.find({parent: comment._id, isReply: true})
            const deleteMany = await comments.deleteMany({parent: comment._id, isReply: true})
            let deletedCommentsCount = 0;
            if(comment.parent){
                await comments.findByIdAndUpdate(comment.parent,
                    {
                        $pull: {children: commentId}
                    }
                )
            }
            await comments.findByIdAndDelete(commentId);
            deletedCommentsCount = deletedCommentsCount + deleteMany.deletedCount + 1;
            await blogs.findByIdAndUpdate(id, {
                $inc: { 'activity.total_comments': -deletedCommentsCount },
                $pull: {
                    'comments': { $in: [comment._id, ...deleteCount.map(reply => reply._id)] }
                }
            });
        }
        return res.status(200).json("Comment deleted successfully");
    } catch (error) {
        next(error);
    }
};