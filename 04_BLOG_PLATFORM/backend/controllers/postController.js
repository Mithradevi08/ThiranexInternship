import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

// @desc Get all posts
// @route GET /api/posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    // Attach comment counts
    const postsWithCounts = await Promise.all(
      posts.map(async (p) => {
        const commentCount = await Comment.countDocuments({ post: p._id });
        return {
          ...p.toObject(),
          commentCount
        };
      })
    );

    res.json({
      success: true,
      count: postsWithCounts.length,
      posts: postsWithCounts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single post by ID with comments
// @route GET /api/posts/:id
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const comments = await Comment.find({ post: post._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      post,
      comments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create a new post
// @route POST /api/posts
export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      category: category ? category.trim() : 'Tech & Development',
      author: req.user._id,
      authorName: req.user.name
    });

    res.status(201).json({
      success: true,
      post
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update post
// @route PUT /api/posts/:id
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized to edit this post' });
    }

    const { title, content, category } = req.body;
    if (title) post.title = title.trim();
    if (content) post.content = content.trim();
    if (category) post.category = category.trim();
    post.updatedAt = Date.now();

    const updatedPost = await post.save();

    res.json({
      success: true,
      post: updatedPost
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete post and its comments
// @route DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this post' });
    }

    await Comment.deleteMany({ post: post._id });
    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Post and associated comments deleted'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Add comment to post
// @route POST /api/posts/:id/comments
export const addComment = async (req, res) => {
  try {
    const { authorName, content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Comment content is required' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const comment = await Comment.create({
      post: post._id,
      authorName: authorName ? authorName.trim() : 'Anonymous Reader',
      content: content.trim()
    });

    res.status(201).json({
      success: true,
      comment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
