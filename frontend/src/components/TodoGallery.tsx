import {Todo} from "../model/Todo";
import TodoCard from "./TodoCard";


type TodoGalleryProps = {
    todos : Todo[]
}

export default function TodoGallery(props : TodoGalleryProps){

    return <div className="todo-gallery">
        { props.todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)}
    </div>
}