import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterValuesType = "all"|"active"|"completed"

function App() {

    let [tasks, setTask] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: true}
    ])


    let [filter, setFilter] = useState<FilterValuesType>("all")

    let tasksForTodolist = tasks

    if (filter === "all") {

    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(task => !task.isDone)

    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }


    const removeTask = (id: number) => {
        setTask(tasks.filter(task => task.id !== id))
    }

    const taskDone = (id: number) => {
        setTask(tasks.map(task => {
            if (task.id === id) {
                task.isDone = !task.isDone
            }
            return task
        }))
    }


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasksForTodolist} removeTask={removeTask} taskDone={taskDone}
                      setFilter={setFilter}/>

        </div>
    );
}

export default App;
