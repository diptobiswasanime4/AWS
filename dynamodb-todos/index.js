import AWS from "aws-sdk";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { v4 } from "uuid";
import {
  addItem,
  getAllItems,
  getTableInfo,
  getItem,
  editItem,
  deleteItem,
} from "./db.js";

dotenv.config();

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  res.json({ msg: "API health is ok ok", success: true });
});

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});

// getTableInfo();
// addItem({ TodoId: "c", TodoName: "Write TS", Completed: false });

// Example usage
// getItem({ TodoId: "a" });

// Call the function
// getAllItems();

// Edit an existing todo
// editItem("c", { TodoName: "Write TS", Completed: true });

// Delete a todo
// deleteItem("d");

app.get("/todos", async (req, res) => {
  const todos = await getAllItems();
  console.log(todos);

  res.json({ todos });
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await getItem({ TodoId: id });
  console.log(todo);

  res.json({ todo });
});

app.post("/todos", async (req, res) => {
  const id = v4();
  const { task, completed } = req.body;
  addItem({ TodoId: id, TodoName: task, Completed: completed });

  res.json({ msg: "Todo added", success: true });
});

app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const { task, completed } = req.body;
  editItem(id, { TodoName: task, Completed: completed });

  res.json({ msg: "Todo Edited", success: true });
});

app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  deleteItem(id);

  res.json({ msg: "Item deleted", success: true });
});
