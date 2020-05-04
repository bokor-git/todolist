import styles from './App.module.css';
import {Todolist} from './components/Todolist/Todolist';
import React from 'react';
import {v1} from "uuid";

export type TaskType={
    id:string
    title:string
    isDone: boolean
}

function App() {

    const tasks:Array<TaskType>=[
        {id:v1(), title:"CSS", isDone:true},
        {id:v1(), title:"JS", isDone:true},
        {id:v1(), title:"React", isDone:false}
    ]
    const tasks2:Array<TaskType>=[
        {id:v1(), title:"Car", isDone:true},
        {id:v1(), title:"Jet", isDone:true},
        {id:v1(), title:"Bicycle", isDone:false}
    ]
    const tasks3:Array<TaskType>=[
        {id:v1(), title:"Money", isDone:true},
        {id:v1(), title:"Food", isDone:true},
        {id:v1(), title:"Health", isDone:false}
    ]

    return (
        <div className={styles.App}>
            <Todolist tasks={tasks} text = "What to learn"/>
            <Todolist tasks={tasks2}  text = "What to buy" />
            <Todolist tasks={tasks3} text = "What to forgot" />
        </div>
    );
}

export default App;
