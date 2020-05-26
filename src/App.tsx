import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type todoListType = {
    id: string, title: string, filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}
function App() {


    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id != id)
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [task, ...todoListTasks];
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId]

        let task = todoListTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks});
    }




    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<todoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])


    let [tasks, setTasks] = useState<TasksStateType>({
            [todoListId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},],
            [todoListId2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Car", isDone: true},
                {id: v1(), title: "React Book", isDone: false},
            ]
        }
    )

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(td => td.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id != todoListId))
        delete tasks[todoListId]
    }

    function addTodoList(title: string) {
        let todoListId = v1()
        let newTodoList: todoListType = {id: todoListId, title: title, filter: "all"}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [todoListId]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoLists.map(tl => {
                let allTodoListTasks = tasks[tl.id]
                let tasksForTodolist = allTodoListTasks;

                if (tl.filter === "active") {
                    tasksForTodolist = allTodoListTasks.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTodoListTasks.filter(t => t.isDone === true);
                }


                return <Todolist key={tl.id} title={tl.title}
                                 removeTodoList={removeTodoList}
                                 todoListId={tl.id}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}
                                 filter={tl.filter}
                />
            })}

        </div>
    );
}

export default App;
