const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

let users = [
  { id: 1, name: "Alex" },
  { id: 2, name: "Sam" }
];

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET one user
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// CREATE user
app.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE user
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name;

  res.json(user);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id != req.params.id);

  res.json({ message: "User deleted" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


















