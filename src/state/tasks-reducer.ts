import {TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, todoListId1, todoListId2} from "./todolist-reducer";

export type removeTask = { type: 'REMOVE-TASK', taskId: string, todolistId: string }
export type addTask = { type: 'ADD-TASK', title: string, todolistId: string }
export type changeTaskStatus = { type: 'CHANGE-TASK-STATUS', taskId: string, isDone: boolean, todolistId: string }
export type changeTaskTitle = { type: 'CHANGE-TASK-TITLE', taskId: string, title: string, todolistId: string }
export type addTodolist = { type: 'ADD-TODOLIST', title: string, todolistId: string }

export const removeTaskAC = (taskId: string, todolistId: string): removeTask => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): addTask => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatus => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitle => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}


export const AddTodolistAC = (title: string): addTodolist => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export type ActionType =
    removeTask
    | addTask
    | changeTaskStatus
    | changeTaskTitle
    | addTodolist
    | AddTodoListActionType
    | RemoveTodoListActionType


const initialState: TasksStateType = {
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
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let filteredTodolist = state[action.todolistId]
            state[action.todolistId] = filteredTodolist.filter(t => t.id != action.taskId)
            return {...state}
        case "ADD-TASK":
            let task = {id: v1(), title: action.title, isDone: false};
            let todoListTasks2 = state[action.todolistId]
            state[action.todolistId] = [task, ...todoListTasks2];
            return ({...state});
        case 'CHANGE-TASK-STATUS':
            let todolistTasks = state[action.todolistId]
            let newTaskArray = todolistTasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t);
            state[action.todolistId] = newTaskArray
            return {...state}
        case "CHANGE-TASK-TITLE":
            let todolistTasks2 = state[action.todolistId]
            let newTaskArray2 = todolistTasks2.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            state[action.todolistId] = newTaskArray2
            return {...state}
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST":
            delete state[action.id]
            return {...state}
        default:
            return state
    }
}