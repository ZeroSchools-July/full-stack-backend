const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3006",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.options("*", cors());

// CRUD - Create, Read, Update, Delete

const taskRouter = require("./routers/taskRouter");
const userRouter = require("./routers/userRouter");

app.use("/task", taskRouter);
app.use("/user", userRouter);

// 5 -> PATCH -> Update || Create

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
