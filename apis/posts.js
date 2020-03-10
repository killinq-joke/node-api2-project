const express = require("express");
const helpers = require("../data/db");
const router = express.Router();

router.get("/api/posts", (req, res) => {
  helpers
    .find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  helpers
    .findById(id)
    .then(post => {
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(post);
        }
      
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be retrieved." });
    });
});

router.get("/api/posts/:id/comments", (req, res) => {
  const { id } = req.params;

  helpers
    .findCommentById(id)
    .then(response => {
        if (!response) {
            res.status(404).json({ error: "There was an error while saving the comment to the database" })
        } else {
            res.status(200).json(response);
        }
      
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the comment to the database" });
    });
});

router.post("/api/posts/", (req, res) => {
  const post = req.body;
  helpers
    .insert(post)
    .then(response => {
      if (post.hasOwnProperty("title") && post.hasOwnProperty("contents")) {
        res.status(201).json(response);
      } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the post to the database" });
    });
});

router.post("/api/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const comment = req.body;
  comment.post_id = id;
  helpers
    .insertComment(comment)
    .then(response => {
        if(!response) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else if (comment.hasOwnProperty("text")) {
            res.status(201).json(comment);
        } else {
            res.status(400).json({ errorMessage: "Please provide text for the comment." })
        }
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the comment to the database" });
    });
});

router.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = req.body;

  helpers
    .update(id, post)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error" });
    });
});

router.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  helpers
    .remove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error" });
    });
});

module.exports = router;
