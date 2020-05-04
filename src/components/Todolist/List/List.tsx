import React from 'react';
import styles from './style.module.css';
import {Task} from "./Task/Task";
import {TaskType} from "../../../App";

type PropsType = {
    tasks:Array<TaskType>
}

export function List(props:PropsType) {

    const jsxElements=props.tasks.map(
        task=>{return <Task title={task.title} isDone={task.isDone}/>}
    )

    return <div className={styles.list}>
        {jsxElements}
    </div>
}
