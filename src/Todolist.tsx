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
}

export function Todolist(props: PropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState(" ")

    const addTask = () => {props.addNewTask(newTaskTitle);setNewTaskTitle("")}
    const changeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    const filterAllTasks = () => {props.changeFilter("all")}
    const filterActiveTasks = () => {props.changeFilter("active")}
    const filterCompletedTasks =() => {props.changeFilter("completed")}
    const onEnterPress = (e:KeyboardEvent) => {if(e.charCode===13){addTask()}}

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onKeyPress={onEnterPress}
                   onChange={changeNewTaskTitle}/>
            <button  onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t =>{
                    const deleteTask = ()=>props.removeTask(t.id)
                        return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={deleteTask}>x</button>
                    </li>})
            }
        </ul>
        <div>
            <button onClick={filterAllTasks}>All</button>
            <button onClick={filterActiveTasks}>Active</button>
            <button onClick={filterCompletedTasks}>Completed</button>
        </div>
    </div>
}
