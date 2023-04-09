const { Router } = require('express');
const { postController } = require('../controllers/post.controller');

const postRouter = Router();


postRouter.post('/posts', postController.createPost);
postRouter.get('/posts/:id', postController.getPostById);
postRouter.put('/posts/:id', postController.updatePostById);
postRouter.delete('/posts/:id', postController.deletePostById);
postRouter.post('/posts/:id/like', postController.likePostById);
postRouter.post('/posts/:id/unlike', postController.unlikePostById);
postRouter.get('/analytics/posts', postController.getTotalPosts);
postRouter.get('/analytics/posts/top-liked', postController.getTopLikedPosts)


module.exports = {
    postRouter,
}