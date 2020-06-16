import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id != action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: "all"}]
        case  'CHANGE-TODOLIST-TITLE':
            state.map((t) => {
                if (t.id === action.id) {
                    t.title = action.title
                }
            })
            return state

        case'CHANGE-TODOLIST-FILTER':
            state.map((t) => {
                if (t.id === action.id) {
                    t.filter = action.filter
                }
            })
            return state

        default:
            throw new Error("I don't understand this type")
    }
}