import React, {useCallback, useReducer} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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


function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const dispatch = useDispatch();

    const removeTask = useCallback(function (id: string, todoListId: string) {
        dispatch(removeTaskAC(id, todoListId))
    },[dispatch,removeTaskAC])

    const addTask = useCallback(function (title: string, todoListId: string) {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch, addTaskAC])

    const changeStatus = useCallback(function (taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }, [dispatch, changeTaskStatusAC])

    const changeTaskTitle = useCallback(function (taskId: string, newTaskValue: string, todoListId: string) {
        dispatch(changeTaskTitleAC(taskId, newTaskValue, todoListId))
    }, [dispatch, changeTaskTitleAC])


    const changeFilter = useCallback(function (value: FilterValuesType, todoListId: string) {
        dispatch(ChangeTodolistFilterAC(todoListId, value))
    }, [dispatch, ChangeTodolistFilterAC])

    const removeTodoList = useCallback(function (todoListId: string) {
        dispatch(RemoveTodolistAC(todoListId))
    }, [dispatch, RemoveTodolistAC])

    const changeTodoListTitle = useCallback(function (todoListId: string, newTitle: string) {
        dispatch(ChangeTodolistTitleAC(todoListId, newTitle))
    }, [dispatch, ChangeTodolistTitleAC])


    const addTodoList = useCallback(function (title: string) {
        dispatch(AddTodolistAC(title))
    }, [dispatch, AddTodolistAC])

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
                        return <Grid key={tl.id} item>
                            <Paper elevation={3} style={{padding: "20px"}}>
                                <Todolist changeTodoListTitle={changeTodoListTitle}
                                          changeTaskTitleValue={changeTaskTitle} key={tl.id} title={tl.title}
                                          removeTodoList={removeTodoList}
                                          todoListId={tl.id}
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

export default AppWithRedux;
