import { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";
import { MdOutlineDeleteOutline, MdEdit  } from "react-icons/md";
const serverLink = "http://localhost:5000";

function App() {
  const [todos, setTodos] = useState([{name: "Dog the walk"}, {name: "Test the dog"}]);
  const [newTodo, setNewTodo] = useState({});

  const handleAddTodo = function (newTodo, e) {
    e.preventDefault();
    setTodos([...todos, newTodo])
    axios.post(serverLink+"/api", newTodo)
    /*.then((res)=>{
      //console.log(res)
      //newTodo
    }
    )*/
    //setNewTodo();
  }
  const handleChangeNewTodo = function(e) {
    setNewTodo(e.target.value.slice(0,1).toUpperCase()+e.target.value.slice(1));
  }
  useEffect(()=>{
    axios.get(serverLink+"/api").then((res, req)=>{
      setTodos(res.data)
    })
  }, [])
  return (
    <>
      <h1>Todo</h1>
      <form>
        <input onChange={(e)=>handleChangeNewTodo(e)}></input>
        <button onClick={(e)=>handleAddTodo({name: newTodo}, e)}>Add</button>
      </form>
      <ul id="todoList">
        {todos.map((todo, index) => (
          <div key={index} className="todoItems">
          <li>{todo.name}</li>
          <MdEdit color="blue"/>
          <MdOutlineDeleteOutline color="red"/>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
