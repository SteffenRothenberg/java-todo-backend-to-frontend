import './TodoCard.css';
import {Todo} from "../model/Todo";



type TodoCardProps = {
    todo : Todo
}

export default function TodoCard( props : TodoCardProps){

    return <div className="todo-card">
        <h3 className="todo-card__description"> {props.todo.description}</h3>
        <div className="todo-card__id">{props.todo.id}</div>
        <div className="todo-card__status">{props.todo.status}</div>
    </div>
}