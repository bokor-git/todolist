import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Menu} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolist-reducer";
import {
    addTaskAC,
    AddTodolistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string, title: string, filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {


    function removeTask(id: string, todoListId: string) {
        dispatchTasks(removeTaskAC(id,todoListId))
    }

    function addTask(title: string, todoListId: string) {
        dispatchTasks(addTaskAC(title,todoListId))
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatchTasks(changeTaskStatusAC(taskId,isDone,todoListId))
    }

    function changeTaskTitle(taskId: string, newTaskValue: string, todoListId: string) {
        dispatchTasks(changeTaskTitleAC(taskId, newTaskValue, todoListId))
    }


    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])


    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
    })

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatchTodoLists(ChangeTodolistFilterAC(todoListId,value))
    }

    function removeTodoList(todoListId: string) {
        dispatchTodoLists(RemoveTodolistAC(todoListId))
    }

    function changeTodoListTitle(todoListId: string, newTitle: string) {
        dispatchTodoLists(ChangeTodolistTitleAC(todoListId, newTitle))
    }


    function addTodoList(title: string) {
        dispatchTasks(AddTodolistAC(title))
        dispatchTodoLists(AddTodolistAC(title))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        let allTodoListTasks = tasks[tl.id]
                        let tasksForTodolist = allTodoListTasks;

                        if (tl.filter === "active") {
                            tasksForTodolist = allTodoListTasks.filter(t => t.isDone === false);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = allTodoListTasks.filter(t => t.isDone === true);
                        }


                        return <Grid item>
                            <Paper elevation={3} style={{padding: "20px"}}>
                                <Todolist changeTodoListTitle={changeTodoListTitle}
                                          changeTaskTitleValue={changeTaskTitle} key={tl.id} title={tl.title}
                                          removeTodoList={removeTodoList}
                                          todoListId={tl.id}
                                          tasks={tasksForTodolist}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskStatus={changeStatus}
                                          filter={tl.filter}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
