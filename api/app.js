const express = require("express");
const app = express();

// Connect DB
const { mongodb } = require("./db/conn");

// Load Mongoose Models
const { List, Task } = require("./db/models");

/** Load Middlewares */

// Parse JSON data
app.use(express.json());

// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/** Route Handlers */

/**
 * GET /lists
 * Purpose: Get all lists
 */
app.get("/lists", (req, res) => {
  // Return array of lists in db
  List.find({}).then((lists) => {
    res.send(lists);
  });
});

/**
 * POST /lists
 * Purpose: Create a list
 */
app.post("/lists", (req, res) => {
  // Create a new list and return new list to user by id
  let title = req.body.title;

  let newList = new List({
    title,
  });
  newList.save().then((listDoc) => {
    //  Return the full list document
    res.send(listDoc);
  });
});

/**
 * PATCH /lists/:id
 * Purpose: Update a specified list
 */
app.patch("/lists/:id", (req, res) => {
  // Update an existing list and return new list to user by id
  List.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

/**
 * DELETE /lists/:id
 * Purpose: Delete a specified list
 */
app.delete("/lists/:id", (req, res) => {
  // Delete an existing list and return new list to user by id
  List.findOneAndRemove({ _id: req.params.id }).then((removedListDocument) => {
    res.send(removedListDocument);
  });
});

/**
 * GET /lists/:listId/tasks
 * Purpose: Get all tasks in a list
 */
app.get("/lists/:listId/tasks", (req, res) => {
  // Tasks in a list
  Task.find({
    _listId: req.params.listId,
  }).then((tasks) => {
    res.send(tasks);
  });
});

/**
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in the specified list
 */
app.post("/lists/:listId/tasks", (req, res) => {
  // Create a new task in the specified list
  let newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId,
  });
  newTask.save().then((newTaskDoc) => {
    res.send(newTaskDoc);
  });
});

/**
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose: Update a task in the specified list
 */
app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
  // Update a task in the specified list
  Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      _listId: req.params.listId,
    },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a task in the specified list
 */
app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOneAndRemove({
    _id: req.params.taskId,
    _listId: req.params.listId,
  }).then((removedTaskDoc) => {
    res.send(removedTaskDoc);
  });
});

app.listen(3000, () => {
  console.log("Server listening on PORT 3000");
});
