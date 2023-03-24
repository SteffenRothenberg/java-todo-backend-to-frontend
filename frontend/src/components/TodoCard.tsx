import './TodoCard.css';
import {Todo} from "../model/Todo";
import React from "react";



type TodoCardProps = {
    todo : Todo
    advanceFromOpenToInProgress: (id: string) => void
}

export default function TodoCard( props : TodoCardProps){
    function onKlickAdvance(){
        props.advanceFromOpenToInProgress(props.todo.id)
    }

    return <div className="todo-card">
        <h3 className="todo-card__description"> {props.todo.description}</h3>
        {/*<div className="todo-card__id">{props.todo.id}</div>*/}
        <div className="todo-card__status">{props.todo.status}</div>

        <div> <button className="AdvancedButton" onClick={onKlickAdvance}>
            Advance </button> </div>
    </div>
}