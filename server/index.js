const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
mongoose
  .connect(
    process.env.DBLINK
  )
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
const schema = new mongoose.Schema({
  name: String,
})
const Todo = mongoose.model("todo", schema)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api", async (req, res)=>{
  const allTodo = await Todo.find();
  res.json(allTodo);
})
app.post("/api", async (req, res) => {
  const newTodo = new Todo({
    name: req.body.name
  })
  await newTodo.save()
})
app.delete('api', (req, res) => {
  console.log('deleted')
})

app.listen(process.env.PORT, () => console.log("Server started"));
