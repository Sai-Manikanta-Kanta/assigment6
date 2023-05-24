const router = require('express').Router();
const Blog = require('../models/Blog')
const bodyParser = require('body-parser');
const express = require('express');
const app = express()

// Your routing code goes here

app.use(bodyParser.json()); // Parse JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
function getUser(req, res, next) {
  const userId = (req.params.id);
  //console.log(Number(userId))
  Blog.findById(userId).then(user => {
    if (!user) {
      return res.status(404).json({ error: "user not found" })
    }
    res.user = user;
    next();

  }).catch(error => {
    console.error("error found");
    res.status(500).json({ error: "error found" })
  })
}
router.delete('/blog/:id', getUser, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(res.user._id)
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }})
  router.put('/blog/:id', getUser, async (req, res) => {
    if (req.body.id) {
      res.user.id = req.body.id;
    }
    if (req.body.topic) {
      res.user.topic = req.body.topic;
    }
    if (req.body.description) {
      res.user.description = req.body.description;
    }
    if (req.body.posted_at) {
      res.user.posted_at = req.body.posted_at;
    }
    if (req.body.posted_by) {
      res.user.posted_by = req.body.posted_by;
    }
    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  router.post('/blogs', async (req, res) => {
    const user = new Blog({
      id: req.body.id,
      topic: req.body.topic,
      description: req.body.description,
      posted_at: req.body.posted_at,
      posted_by: req.body.posted_by
    });
    try {
      const savedUser = await user.save();
      res.status(201).json({ status: "success", result: [savedUser] });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  router.get('/blogs', async (req, res) => {
    const topic = req.query.search;
    Blog.find({ topic: topic }, (err, blogs) => {
      if (err) {
        console.error(err);
        res.status(500).send("error")
      }
      else {
        res.json({
          status: "success",
          result: [blogs]
        })
      }
    })

  });
  module.exports = router;