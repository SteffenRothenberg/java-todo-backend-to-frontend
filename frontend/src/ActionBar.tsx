import {ChangeEvent} from "react";


type ActionBarProps = {
    inputText: string,
    onChange: (value: string) => void
}
export default function ActionBar(props: ActionBarProps) {

    function onTextChange(event: ChangeEvent<HTMLInputElement>) {
        props.onChange(event.target.value)
    }
    return (
        <div>
            <input className="actionBarInput" value={props.inputText} onChange={onTextChange}/>
        </div>
    )
}