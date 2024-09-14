const express = require("express");
const router = express.Router();
const db = require("../db");

// 4 http methods
// 1 -> GET -> Read => server -> client
router.get("/", async (req, res) => {
  const tasks = await db.tasks.findMany();

  res.json({ tasks });
});

// tasks = [{task: task, completed:false, id: 23, userId: 45},
// {task: task1, completed:false, id: 34, userId: 55},
// {task: task2, completed:false, id: 44, userId: 55}]

// 2 -> POST -> Create -> client -> server

router.post("/", async (req, res) => {
  const { task, userId } = req.body;
  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }

  await db.tasks.create({
    data: {
      taskName: task,
      usersId : Number(userId)
    },
  });
  res.status(201).json({ message: "Task Added" });
});

// 3 -> PUT -> Update

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  if (!id || !task) {
    return res.status(400).json({ message: "Id, Task is required" });
  }
  const taskObj = await db.tasks.update({
    where: {
      id: Number(id),
    },
    data: {
      taskName: task,
      completed,
    },
  });
  res.status(201).json({ message: "Task Updated", task: taskObj });
});

// 4 -> DELETE -> Delete

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.tasks.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json({ message: "Task Deleted" });
});

module.exports = router;
