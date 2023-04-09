const { PostModel } = require('../models/post.model');


// Post Controller: create a new post
const createPost = async (req, res) => {
  try {
    const { user_id, content } = req.body;
    const post = await PostModel.create({ user_id, content });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
// Post Controller: get a post
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
// Post Controller: update a post 
const updatePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const post = await PostModel.findByIdAndUpdate(
      id,
      { content, updated_at: Date.now() },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Post Controller: delete a post
const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Post Controller: like a post
const likePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Post Controller: ulike a post
const unlikePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findByIdAndUpdate(
      id,
      { $inc: { likes: -1 } },
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Post Controller: Count the total number of posts
const getTotalPosts = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    res.status(200).json({ total_posts: totalPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post Controller: Get the top 5 most liked posts
const getTopLikedPosts = async (req, res) => {
  try {
    const topLikedPosts = await Post.find().sort({ likes: -1 }).limit(5);
    res.status(200).json(topLikedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postController = {
  getPostById,
  getTopLikedPosts,
  getTotalPosts,
  createPost,
  deletePostById,
  updatePostById,
  unlikePostById,
  likePostById
}
module.exports = {
  postController
}