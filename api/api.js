const express = require("express");
const users = require('../users');

const router = express.Router();

router.get("/users", async (req, res) => {

    res.json(await users.list());

});

router.post("/users", async (req, res) => {
    try {
        res.json(await users.add(req.body));
    } catch(err) {
        res.status(404);
        res.json({
            error: err.message
        });

    }
});

router.get("/users/:id", async (req, res) => {
    try {
        res.json(await users.get(req.params.id));
    } catch(err) {
        res.status(404);
        res.json({
            error: err.message
        });

    }

});

router.put("/users/:id",  async (req, res) => {
    try {
        req.body.id = req.params.id;
        res.json(await users.update(req.body));
    } catch(err) {
        res.status(404);
        res.json({
            error: err.message
        })
    }
});

router.delete("/users/:id",  async (req, res) => {
    try {
        res.json(await users.delete(req.params.id));
    } catch(err) {
        res.status(404);
        res.json({
            error: err.message
        })
    }
});

module.exports = router;
