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
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "error "})
    })
})


module.exports = router