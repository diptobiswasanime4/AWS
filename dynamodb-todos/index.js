import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { v4 } from "uuid";
import { addItem, deleteItem, editItem, getAllItems, getItem } from "./db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/health", async (req, res) => {
  res.json({ msg: "API health is ok ok", success: true });
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await getAllItems();

    res.json({ todos });
  } catch (error) {
    res.json({ error });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await getItem({ TodoId: id });
    res.json({ todo });
  } catch (error) {
    res.json({ error });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const id = v4();
    const { task, completed } = req.body;
    addItem({ TodoId: id, TodoName: task, Completed: completed });

    res.json({ msg: "Todo successfully added", success: true });
  } catch (error) {
    res.json({ error });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { task, completed } = req.body;
    await editItem(id, { TodoName: task, Completed: completed });

    res.json({ msg: "Todo edited", success: true });
  } catch (error) {
    res.json({ error });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteItem(id);

    res.json({ msg: "Todo deleted", success: true });
  } catch (error) {
    res.json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`App is running in PORT ${PORT}`);
});

// addItem({ TodoId: "1", TodoName: "Watch Blue Lock", Completed: false });
