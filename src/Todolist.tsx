import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addNewTask: (NewTaskName: string) => void
    changeStatus: (taskId: string, taskStatus: boolean) => void
    filter: "all" | "active" | "completed"
}

export function Todolist(props: PropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState(" ")
    let [error,setError] = useState<string|null>(null)
    const addTask = () => {let trimTitle = newTaskTitle.trim()
        if(trimTitle){
            props.addNewTask(newTaskTitle);
            setNewTaskTitle("")
        }
        else setError("Some error")
    }
    const changeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {setNewTaskTitle(e.currentTarget.value); setError(null)}
    const filterAllTasks = () => {props.changeFilter("all")}
    const filterActiveTasks = () => {props.changeFilter("active")}
    const filterCompletedTasks = () => {props.changeFilter("completed")}
    const onEnterPress = (e: KeyboardEvent) => {if (e.charCode === 13) {addTask()}}
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error?"error":""}
                value={newTaskTitle}
                   onKeyPress={onEnterPress}
                   onChange={changeNewTaskTitle}/>
            <button onClick={addTask}>+</button>
            {error&&<div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked)
                    const deleteTask = () => props.removeTask(t.id)
                    return <li className={t.isDone?"is-done":""} key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatus}/>
                        <span >{t.title}</span>
                        <button onClick={deleteTask}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={filterAllTasks}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={filterActiveTasks}>Active</button>
            <button className={props.filter === "completed" ? "active-filter" : ""} onClick={filterCompletedTasks}>Completed
            </button>
        </div>
    </div>
}
