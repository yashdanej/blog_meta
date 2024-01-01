const express = require('express');
const { CreateBlog, FeedBlogs, UpdateBlog, DeleteBlog, Blog, AddComment, Comments, DeleteComment, LikeBlog, ViewBlog, SimilarBlog, TagsBlog } = require('../controller/blog');
const { verifyToken } = require('../utils/verifyToken');
const { upload } = require('../utils/upload');
const router = express.Router();

router
    .post('/', upload.single('banner'), verifyToken, CreateBlog)
    // Feed blogs
    .get('/', FeedBlogs)
    // Edit blog
    .get('/:id', Blog)
    // Update blog
    .patch('/:id', upload.single('banner'), verifyToken, UpdateBlog)
    // Delete blog
    .delete('/:id', verifyToken, DeleteBlog)
    // Like blog
    .patch('/:id/like', verifyToken, LikeBlog)
    // View blog
    .patch('/:id/view', verifyToken, ViewBlog)
    // Similar blogs
    .get('/:id/similar', SimilarBlog)
    // Similar tags Blogs
    .post('/tags', TagsBlog)

    // Add comment
    .post('/:id/comment/:commentId?', verifyToken, AddComment)
    // Read comment
    .get('/:id/comment/', Comments)
    // Delete comment
    .delete('/:id/comment/:commentId?', verifyToken, DeleteComment)

exports.router = router;