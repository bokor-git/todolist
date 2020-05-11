import React from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    taskDone: (id: number) => void
    setFilter: (filter:FilterValuesType)=>void

}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(task => <li key={task.id}><input type="checkbox" onChange={() => props.taskDone(task.id)}
                                                              checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>X</button>
                </li>
            )}
        </ul>
        <div>
            <button onClick={()=>props.setFilter("all")}>All</button>
            <button onClick={()=>props.setFilter("active")}>Active</button>
            <button onClick={()=>props.setFilter("completed")}>Completed</button>
        </div>
    </div>
}
