import styles from "../style.module.css";
import React from "react";

type PropsType = {
    title: string
    isDone: boolean
}
export const Task = (props: PropsType) => {
    const css = props.isDone?styles.done:"";

    return <div className={styles.task + " " + css}>
            <input type="checkbox" checked={props.isDone}/>
            <span>{props.title}</span>
        </div>

}