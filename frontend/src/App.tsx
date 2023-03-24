import React, {useEffect, useState} from 'react';
import './App.css';
import ActionBar from "./ActionBar";
import axios from "axios";
import TodoGallery from "./components/TodoGallery";
import {Todo} from "./model/Todo";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
function App() {

    const [todoList, setToDoList] = useState<Todo[]>([])
    const [todoAdded, setAddTodo] = useState<string>("")
    const [todoEdit, editTodoStatus] = useState<string>("OPEN")

    function onChange(value: string) {
        setAddTodo(value)
    }
    function loadAllToDos()
    {axios.get("/api/todo")
        .then((response) => {
            setToDoList(response.data)
        })}
    useEffect(( ) => {
        loadAllToDos()
    },[])

    function addTodo() {
        axios.post("/api/todo", {description: todoAdded, id:"", status: "OPEN"})
        .then((response) => {
            setAddTodo(response.data)
        })
            .then(()=> loadAllToDos())
            .then(() => setAddTodo(""))
            .catch(()=> console.error("post on /api/todo not successful"))
    }

    function advanceFromOpenToInProgress(id: string) {
        axios.put("api/todo/" + id, {status: todoEdit})
            .then((response ) =>{
                editTodoStatus("IN_PROGRESS")
            })
    }

  return (

    <div className="App">
      <header className="ToDo-List"></header>
        <ActionBar inputText={todoAdded} onChange={onChange} addTodo={addTodo}/>
        <TodoGallery todos={todoList} advanceFromOpenToInProgress={advanceFromOpenToInProgress} />
    </div>
  );
}
export default App;