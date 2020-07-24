import axios from "axios"

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '0ec4be5c-05ae-403f-b660-0e7e553f2d34'
    }
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}
export type GetTaskResponse ={
    items: Array<TaskType>
    totalCount: number
    error: string
}

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}



const instance = axios.create({baseURL: "https://social-network.samuraijs.com/api/1.1", ...settings})

export const tasksAPI = {
    updateTask(todolistId: string,taskId:string, title: string) {
        const promise = instance.put<ResponseType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
        return promise
    },
    deleteTask(todolistId: string,taskId:string) {
        const promise = instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    addTask(todolistId:string, title: string) {
        const promise = instance.post<ResponseType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title: title})
        return promise
    },
    getTasks(todolistId:string) {
        const promise = instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`,)
        return promise
    }
}



