const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const USERS = "./users.json";
const TASKS = "./tasks.json";

// Signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS));

  if (users.find(u => u.username === username))
    return res.status(400).json({ message: "User already exists" });

  const newUser = { id: uuid(), username, password };
  users.push(newUser);
  fs.writeFileSync(USERS, JSON.stringify(users, null, 2));

  res.json({ message: "Signup successful" });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS));

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful", token: user.id });
});

// Fetch tasks for logged user
app.get("/tasks/:userid", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(TASKS));
  res.json(tasks.filter(t => t.userid === req.params.userid));
});

// Add task
app.post("/tasks", (req, res) => {
  const { userid, title, status } = req.body;
  const tasks = JSON.parse(fs.readFileSync(TASKS));

  const newTask = { id: uuid(), userid, title, status };
  tasks.push(newTask);
  fs.writeFileSync(TASKS, JSON.stringify(tasks, null, 2));

  res.json({ message: "Task added" });
});

// Update status
app.put("/tasks/:id", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(TASKS));
  const task = tasks.find(t => t.id === req.params.id);
  if (task) task.status = req.body.status;

  fs.writeFileSync(TASKS, JSON.stringify(tasks, null, 2));
  res.json({ message: "Task updated" });
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(TASKS));
  const filtered = tasks.filter(t => t.id !== req.params.id);

  fs.writeFileSync(TASKS, JSON.stringify(filtered, null, 2));
  res.json({ message: "Task deleted" });
});

app.listen(5000, () => console.log("Server running on 5000"));
