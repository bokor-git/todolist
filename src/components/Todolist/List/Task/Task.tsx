import styles from "../style.module.css";
import React from "react";
import cn from "classnames";

type PropsType = {
    title: string
    isDone: boolean
}
export const Task = (props: PropsType) => {

    const css =cn({
        [styles.done]:props.isDone
    })

    return <div className={css}>
            <input type="checkbox" checked={props.isDone}/>
            <span>{props.title}</span>
        </div>

}