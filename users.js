const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let users = [
  { id: uuidv4(), name: "Alex" },
  { id: uuidv4(), name: "Sam" }
];

// GET all
router.get("/", (req, res) => {
  res.json(users);
});

// GET one
router.get("/:id", (req, res) => {
  const user = users.find(u => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// CREATE
router.post("/", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const newUser = {
    id: uuidv4(),
    name: req.body.name
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE
router.put("/:id", (req, res) => {
  const user = users.find(u => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.name = req.body.name;
  res.json(user);
});

// DELETE
router.delete("/:id", (req, res) => {
  users = users.filter(u => u.id !== req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;