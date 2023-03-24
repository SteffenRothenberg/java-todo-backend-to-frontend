import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ActionBar from "./ActionBar";
import axios from "axios";
import TodoGallery from "./components/TodoGallery";
import {Todo} from "./model/Todo";
function App() {

    const [todoList, setToDoList] = useState<Todo[]>([])
    const [todoAdded, setAddTodo] = useState<string>("")

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

    function addTodo()
    {axios.post("/api/todo")
        .then((response) => {
            setToDoList(response.data)
        })}

  return (

    <div className="App">
      <header className="ToDo-List"></header>
        <ActionBar inputText={todoAdded} onChange={onChange} addTodo={addTodo}/>
        <TodoGallery todos={todoList} />

    </div>
  );
}
export default App;