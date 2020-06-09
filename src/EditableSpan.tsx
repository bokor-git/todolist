import React, {useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value: string,
    onChange: (title: string) => void

}

export function EditableSpan(props: EditableSpanPropsType) {

    let [title, setTitle] = useState(props.value)
    let [editMode, setEditMode] = useState<boolean>(false)

    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }


    return <>{editMode ?
        <TextField color={"primary"} variant={"standard"} type="text" value={title} autoFocus onBlur={activeViewMode}
                   onChange={(event) => setTitle(event.currentTarget.value)}/>
        : <span onDoubleClick={activeEditMode}>{props.value}</span>} </>


}