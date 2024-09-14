const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 4 http methods
// 1 -> GET -> Read
router.get("/", userController.getUsers);

// 2 -> POST -> Create

router.post("/", userController.createUser);

// 3 -> PUT -> Update

router.put("/:id", userController.updateUser);

// 4 -> DELETE -> Delete

router.delete("/:id", userController.deleteUser);
// /user/id/tasks
router.get("/:id/tasks", userController.getUserTasks);

module.exports = router;
