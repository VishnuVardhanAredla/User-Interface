// 1. import any needed libraries
const express = require("express");
const Post = require('../models/posts'); //accesses functions in post model file
const router = express.Router();

// 2. create all routes to access database
router
  .post('/create', async (req, res) => {
    try {
      const post = await Post.create(req.body.subject, req.body.content, req.body.userId);
      res.json(post);
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/getPost/:id', async (req, res) => {
    try {
      const post = await Post.getPost(req.params.id);
      res.json(post);
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .get('/getUserPosts/:id', async (req, res) => {
    try {
      const posts = await Post.getUserPosts(req.params.id);
      res.json(posts);
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .put('/update', async (req, res) => {
    try {
      const post = await Post.updatePost(req.body.id, req.body.subject, req.body.content);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      await Post.deletePost(req.body.id);
      res.send({ success: "Post deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

// 3. export router for use in index.js
module.exports = router;

