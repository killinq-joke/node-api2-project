const express = require("express");
const helpers = require("../data/db")
const router = express.Router();

router.get("/api/posts", (req, res) => {
    helpers.find()
    .then(users => {
        res.status(200).json({users})
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "error" })
    })
})

router.get("/api/posts/:id", (req, res) => {

    const {id} = req.params;

    helpers.findById(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "error" })
    })
})

router.post("/api/posts/", (req, res) => {
    const payload = req.body;
    helpers.insert(payload)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "error" })
    })
})  

module.exports = router