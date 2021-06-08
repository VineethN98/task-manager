const express = require("express");
const app = express();

// Connect DB
const { mongodb } = require("./db/conn");

// Load Mongoose Models
const { List, Task } = require("./db/models");

// Parse JSON data
app.use(express.json());

// Route Handlers

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

app.listen(3000, () => {
  console.log("Server listening on PORT 3000");
});
