import {TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolist-reducer";

export type removeTask = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}
export type addTask = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}
export type changeTaskStatus = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    isDone: boolean,
    todolistId: string
}
export type changeTaskTitle = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string,
    todolistId: string
}

export type addTodolist = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}

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

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let todoListTasks = state[action.todolistId]
            state[action.todolistId] = todoListTasks.filter(t => t.id != action.taskId)
            return {...state}
        case "ADD-TASK":
            let task = {id: v1(), title: action.title, isDone: false};
            let todoListTasks2 = state[action.todolistId]
            state[action.todolistId] = [task, ...todoListTasks2];
            return ({...state});
        case 'CHANGE-TASK-STATUS':
            let todoListTasks3 = state[action.todolistId]
            let task2 = todoListTasks3.find(t => t.id === action.taskId);
            if (task2) {
                task2.isDone = action.isDone;
            }
            return {...state}
        case "CHANGE-TASK-TITLE":
            let todoListTasks4 = state[action.todolistId]
            let task3 = todoListTasks4.find(t => t.id === action.taskId);
            if (task3) {
                task3.title = action.title;
            }
            return {...state}

        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST":
            delete state[action.id]
            return {...state}
        default:
            throw new Error("I don't understand this type")
    }
}