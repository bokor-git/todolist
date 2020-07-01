import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType= {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodoListActionType= {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId:string
}

export type ChangeTodoListTitleActionType= {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}

export type ChangeTodoListFilterActionType= {
    type: 'CHANGE-TODOLIST-FILTER',
    id:string
    filter: FilterValuesType
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const TodolistAC = (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST',  title, todolistId: v1()}
}

export const ChangeTodolistTitleAC = (id: string,  title: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE',title , id}
}

export const ChangeTodolistFilterAC = (id: string,  filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter, id}
}

export type ActionType = RemoveTodoListActionType| AddTodoListActionType| ChangeTodoListTitleActionType| ChangeTodoListFilterActionType

export let todoListId1 = v1()
export let todoListId2 = v1()


const initialState:Array<TodoListType> =[
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
]
export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id != action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
        case  'CHANGE-TODOLIST-TITLE':
              state.map((t) => {
                if (t.id === action.id) {
                    t.title = action.title
                }
            })
            return [...state]

        case'CHANGE-TODOLIST-FILTER':
            state.map((t) => {
                if (t.id === action.id) {
                    t.filter = action.filter
                }
            })
            return [...state]

        default:
            return state
    }
}