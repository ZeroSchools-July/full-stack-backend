const db = require("../db");

exports.getUsers = async (req, res) => {
  const users = await db.users.findMany({
    select: { id: true, name: true, email: true },
  });
  res.json({ users });
};

exports.createUser = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  await db.users.create({
    data: {
      name,
      password,
      email,
    },
  });

  res.status(201).json({ message: "user Added" });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, password, email } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }
  const userObj = await db.users.update({
    where: {
      id: Number(id),
    },
    data: { name, email, password },
    select: { id: true, name: true, email: true },
  });
  res.status(201).json({ message: "user Updated", user: userObj });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await db.users.delete({ where: { id: Number(id) } });
  res.status(200).json({ message: "user Deleted" });
};

exports.getUserTasks = async (req, res) => {
  const { id } = req.params;

  // select * from tasks as t, users as u where u.id = id and t.usersid = id
  // const user = await db.users.findUnique({
  //   where: { id: Number(id) },
  //   include: {
  //     Tasks: true,
  //   },
  // });

  // select * from tasks where usersId = id;
  const tasks = await db.tasks.findMany({
    where: {
      usersId: Number(id),
    },
  });

  res.status(200).json({
    tasks,
  });
};
