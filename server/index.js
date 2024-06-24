const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
//const {ObjectId} = require('mongodb')
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
  name: {
    type:String,
    required:true,
  },
  isCompleted: {
    type:Boolean,
    required:true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low'
  }
})
const Todo = mongoose.model("todo", schema)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api", async (req, res)=>{
  const allTodo = await Todo.find();
  return res.json(allTodo);
})
app.post("/api", async (req, res) => {
  const newTodo = new Todo({
    name: req.body.name,
    isCompleted: req.body.isCompleted,
    priority: req.body.priority
  })
  await newTodo.save();
  //return resolve();
  return res.json()
})
//req.params
app.delete('/api/:_id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params._id);
  return res.json()

})
app.put('/api/markDone/:_id', async (req, res)=>{
  await Todo.findByIdAndUpdate(req.params._id, {isCompleted:true})
  return res.json()

})
app.listen(process.env.PORT, () => console.log("Server started"));
