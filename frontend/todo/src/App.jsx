//import ObjectId from 'mongodb';
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { MdOutlineDeleteOutline, MdEdit } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
//import mongoose from "mongoose"

const serverLink = "http://localhost:5000";

function App() {
  const [todos, setTodos] = useState([{ name: "Loading" }]);
  const [newTodo, setNewTodo] = useState({});
  const [priority, setPriority] = useState('Low');
  const getAllTodos = function () {
    axios.get(serverLink + "/api").then((res, req) => {
      setTodos(res.data);
    });
  };
  useEffect(() => {
    getAllTodos();
  }, []);
  const handleAddTodo = function (newTodo, e) {
    e.preventDefault();
    //setTodos([...todos, newTodo]);
    axios
      .post(serverLink + "/api", newTodo)
      .then(() => {
        getAllTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteTodo = function (_id) {
    axios.delete(serverLink+"/api/" + _id);
    const deletedTodo = todos.filter((todo) => {
      return todo._id != _id;
    });
    setTodos(deletedTodo);
  };
  const handleMarkDone = function (_id) {
    axios.put(serverLink+'/api/markDone/'+_id, {
    }).then(()=>{
      getAllTodos();
    })
  }
  const handleChangeNewTodo = function (e) {
    setNewTodo(
      e.target.value.slice(0, 1).toUpperCase() + e.target.value.slice(1)
    );
  };
  const handleChangePriority = function (e) {
    setPriority(e.target.value)
  }
  return (
    <>
      <h1 className="text-center m-4">Todo</h1>
      <form className="mx-4 my-4 d-flex justify-content-between">
        <input
          className="fs-4 form-control"
          onChange={(e) => handleChangeNewTodo(e)}
        ></input>
        <select onChange={(e)=>handleChangePriority(e)} className="mx-2 w-25 form-control">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button
          className="fs-4 px-3 btn btn-success"
          onClick={(e) => handleAddTodo({ 
            name: newTodo,
            isCompleted: false,
            priority: priority,
          }, e)}
        >
          +
        </button>
      </form>
      <ul className="w-75 mx-auto list-group" id="todoList">
        {todos.map((todo, index) => (
          <div
            key={index}
            className={`no-bullet todoItems d-flex justify-content-between ${todo.isCompleted&&'text-danger'}`}
          >
            <div className="d-flex">
              <li>{index + 1 + ")" + "\u00A0"}</li>
              <li>{todo.name}</li>
            </div>
            <div>
              <IoMdCheckmarkCircleOutline onClick={()=>handleMarkDone(todo._id)} color="green" />
              <MdEdit color="blue" />
              <MdOutlineDeleteOutline
                onClick={() => handleDeleteTodo(todo._id)}
                color="red"
              />
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
