// Create web server
// 1. Create web server
// 2. Create router
// 3. Create router handler
// 4. Register router handler
// 5. Start web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = express();

const commentsByPostId = {};

// 1. Create web server
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

// 2. Create router
const router = express.Router();

// 3. Create router handler
router.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

router.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

// 4. Register router handler
app.use(bodyParser.json());
app.use(router);

// 5. Start web server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
