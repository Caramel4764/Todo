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
    //_id: req.body._id,
  })
  //console.log(newTodo)
  await newTodo.save();
  //return resolve();
  return res.json(1)
})
//req.params
app.delete('/api/:_id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params._id);
  return res.json(1)

})

app.listen(process.env.PORT, () => console.log("Server started"));
