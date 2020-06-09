import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";


type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTaskTitleValue: (taskId: string, newValue: string, todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => props.addTask(title, props.todoListId);


    const onAllClickHandler = () => props.changeFilter("all", props.todoListId);
    const onActiveClickHandler = () => props.changeFilter("active", props.todoListId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todoListId);
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodolistTitleValue = (newTitle: string) => props.changeTodoListTitle(props.todoListId, newTitle)

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitleValue}/>
            <IconButton onClick={removeTodoList}><Delete/></IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>
        {
            props.tasks.map(t => {
                const onClickHandler = () => props.removeTask(t.id, props.todoListId)
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId);
                }
                const changeTaskTitle = (title: string) => {
                    props.changeTaskTitleValue(t.id, title, props.todoListId)
                }


                return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                    <Checkbox color={"primary"}
                              onChange={onChangeHandler}
                              checked={t.isDone}/>
                    <EditableSpan onChange={changeTaskTitle} value={t.title}/>
                    <IconButton onClick={onClickHandler}><Delete/></IconButton>
                </div>
            })
        }

        <div>
            <Button variant={props.filter === 'all' ? "contained" : "outlined"} color={"default"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.filter === 'active' ? "contained" : "outlined"} color={"primary"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? "contained" : "outlined"} color={"secondary"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

