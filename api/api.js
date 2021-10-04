const express = require("express");
const users = require('../users');

const router = express.Router();

router.get("/users", (req, res) => {

    res.json(users.list());

});

router.post("/users", async (req, res) => {

    res.json(await users.add(req.body));

});

router.get("/users/:id", (req, res) => {

    res.json(users.get(req.params.id));

});

router.put("/users/:id",  async (req, res) => {

    req.body.id = Number(req.params.id);

    res.json(await users.update(req.body));

});

router.delete("/users/:id",  async (req, res) => {

    res.json(await users.delete(req.params.id));

});

module.exports = router;
