import axios from "axios"

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '0ec4be5c-05ae-403f-b660-0e7e553f2d34'
    }
}

export type TodolistType = {
    id: string,
    title:string,
    addedDate: string,
    order: number
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}

type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}



const instance = axios.create({baseURL: "https://social-network.samuraijs.com/api/1.1", ...settings})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType<{}>>(`/todo-lists/${todolistId}`, {title: title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{item:TodolistType}>>("/todo-lists", {title: title})
        return promise
    },
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>('/todo-lists/')
        return promise
    }
}

