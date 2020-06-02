import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from "./AddItemForm";


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
    changeTodoListTitle: (todoListId: string, newTitle:string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => props.addTask(title, props.todoListId);


    const onAllClickHandler = () => props.changeFilter("all", props.todoListId);
    const onActiveClickHandler = () => props.changeFilter("active", props.todoListId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todoListId);
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodolistTitleValue = (newTitle:string)=> props.changeTodoListTitle(props.todoListId, newTitle)

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitleValue}/>
            <button onClick={removeTodoList}>x</button>
        </h3>

        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todoListId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId);
                    }
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitleValue(t.id, title, props.todoListId)
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan onChange={changeTaskTitle} value={t.title}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

type EditableSpanPropsType = {
    value: string,
    onChange: (title: string) => void

}

function EditableSpan(props: EditableSpanPropsType) {

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


    return <>{editMode ? <input type="text" value={title} autoFocus onBlur={activeViewMode}
                                onChange={(event) => setTitle(event.currentTarget.value)}/>
        : <span onDoubleClick={activeEditMode}>{props.value}</span>} </>


}