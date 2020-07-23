import axios from "axios"

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '0ec4be5c-05ae-403f-b660-0e7e553f2d34'
    }
}

const instance = axios.create({baseURL: "https://social-network.samuraijs.com/api/1.1", ...settings})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(`/todo-lists/${todolistId}`, {title: title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete(`/todo-lists/${todolistId}`)
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post("/todo-lists", {title: title})
        return promise
    },
    getTodolists() {
        const promise = instance.get('/todo-lists/')
        return promise
    }
}

