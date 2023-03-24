import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ActionBar from "./ActionBar";
//import axios from "axios";

function addToDoButton() {

}

function App() {

    const [addToDoText, setToDoText] = useState("")
    function onChange(value: string) {
        setToDoText(value)
    }
  return (

    <div className="App">
      <header className="ToDo-List"></header>
        <ActionBar inputText={addToDoText} onChange={onChange}/>
        <p><button className="ButtonOne" onClick={addToDoButton}>
            Click me </button></p>
    </div>
  );
}

export default App;