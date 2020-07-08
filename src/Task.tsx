import Checkbox from "@material-ui/core/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";

type TaskPropsType = {
    task:TaskType
    removeTask: (taskId: string, todoListId: string) => void
    todoListId:string
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitleValue: (taskId: string, newValue: string, todoListId: string) => void


}
export const Task =React.memo ((props:TaskPropsType)=> {

    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todoListId),[props.removeTask,props.todoListId,props.task.id])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId);
    },[props.changeTaskStatus,props.todoListId])
    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitleValue(props.task.id, title, props.todoListId)
    },[props.changeTaskTitleValue,props.todoListId])

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox color={"primary"}
                  onChange={onChangeHandler}
                  checked={props.task.isDone}/>
        <EditableSpan onChange={changeTaskTitle} value={props.task.title}/>
        <IconButton onClick={onClickHandler}><Delete/></IconButton>
    </div>})