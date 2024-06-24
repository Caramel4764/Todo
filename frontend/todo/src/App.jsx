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
        console.log("success");
        getAllTodos();
      })
      .catch((err) => {
        console.log(err);
      });
    /*.then((res)=>{
      //console.log(res)
      //newTodo
    }
    )*/
    //setNewTodo();
  };
  const handleDeleteTodo = function (_id) {
    axios.delete("http://localhost:5000/api/" + _id);
    const deletedTodo = todos.filter((todo) => {
      return todo._id != _id;
    });
    //console.log(deletedTodo);
    setTodos(deletedTodo);
  };
  const handleChangeNewTodo = function (e) {
    setNewTodo(
      e.target.value.slice(0, 1).toUpperCase() + e.target.value.slice(1)
    );
  };
  return (
    <>
      <h1 className="text-center m-4">Todo</h1>
      <form className="mx-4 my-4 d-flex justify-content-between">
        <input
          className="fs-4 form-control"
          onChange={(e) => handleChangeNewTodo(e)}
        ></input>
        <button
          className="mx-2 fs-4 px-3 btn btn-success"
          onClick={(e) => handleAddTodo({ name: newTodo }, e)}
        >
          +
        </button>
      </form>
      <ul className="w-75 mx-auto list-group" id="todoList">
        {todos.map((todo, index) => (
          <div
            key={index}
            className="no-bullet todoItems d-flex justify-content-between"
          >
            <div className="d-flex">
              <li>{index + 1 + ")" + "\u00A0"}</li>
              <li>{todo.name}</li>
            </div>
            <div>
              <IoMdCheckmarkCircleOutline color="green"/>
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
