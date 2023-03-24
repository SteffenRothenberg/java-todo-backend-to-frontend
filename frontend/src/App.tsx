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
        const todoToUpdate = todoList.find(todo => todo.id === id);
        if (todoToUpdate) {
            let updatedStatus;
            if (todoToUpdate.status === "OPEN") {
                updatedStatus = "IN_PROGRESS";
            } else if (todoToUpdate.status === "IN_PROGRESS") {
                updatedStatus = "DONE";
            }
            const updatedTodo = {
                ...todoToUpdate,
                status: updatedStatus
            };
            axios
                .put(`/api/todo/${id}`, updatedTodo) //Wird so benötigt da wir warum auch immer ein ID Problem haben
                .then(() => {                           //Hier wird die ID abgefrag ? jedenfalls funktioniert es damit
                    loadAllToDos();
                })
                .catch(() => console.error("put on /api/todo not successful"));
        }
    }

    //Hier nur von OPEN zu IN_PROGRESS
    // function advanceFromOpenToInProgress(id: string) {
    //     const updatedTodo = {
    //         id: id,
    //         description: "",
    //         status: "IN_PROGRESS"
    //     };
    //     axios.put(`/api/todo/${id}`, updatedTodo)
    //         .then(() => {
    //             loadAllToDos();
    //         })
    //         .catch(() => console.error("put on /api/todo not successful"))
    //}

    //Fail 1 Robin
    // function advanceFromOpenToInProgress(id: string) {
    //     axios.put("api/todo/" + id, {status: "IN_PROGRESS"})
    //         .then(() =>{
    //             loadAllToDos();
    //         })
    //         .catch(()=> console.error("put on /api/todo not successful"))
    // }
    // Team version
    // function advanceFromOpenToInProgress(id: string) {
    //     axios.put("api/todo/" + id, {status: todoEdit})
    //         .then((response ) =>{
    //             editTodoStatus("IN_PROGRESS")
    //         })
    // }

  return (

    <div className="App">
      <header className="ToDo-List"></header>
        <ActionBar inputText={todoAdded} onChange={onChange} addTodo={addTodo}/>
        <TodoGallery todos={todoList} advanceFromOpenToInProgress={advanceFromOpenToInProgress} />
    </div>
  );
}
export default App;