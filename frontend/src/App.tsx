import React, { useState } from 'react';
import axios from 'axios';
import ActionBar from './ActionBar';

function App() {
    const [addToDoText, setToDoText] = useState('');

    function onChange(value: string) {
        setToDoText(value);
    }

    function addToDo() {
        const newToDo = addToDoText;
        if (newToDo !== '') {
            axios.post('/api/todo', {
                    title: newToDo,
                    done: false,
                })
                .then(function (response) {
                    console.log(response);
                    setToDoText('');
                })
        }
    }

    return (
        <div className="App">
            <header className="ToDo-List"></header>
            <ActionBar inputText={addToDoText} onChange={onChange} />
            <p>
                <button className="ButtonOne" onClick={addToDo}>
                    Save ToDo
                </button>
            </p>
        </div>
    );

}

export default App;
