import React, {useEffect, useState} from 'react'
import {tasksAPI} from "./api/task-api";

export default {
    title: 'Tasks API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'cdc88cc2-21c8-498f-b19c-c2ad7b550d64'
    useEffect(() => {
        tasksAPI.getTasks(todolistId).then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const AddTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'cdc88cc2-21c8-498f-b19c-c2ad7b550d64'
    useEffect(() => {
        tasksAPI.addTask(todolistId, "new task").then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'cdc88cc2-21c8-498f-b19c-c2ad7b550d64'
    const taskId = 'b5e235d1-1459-41e6-a1ff-b26a73c313e9'
    useEffect(() => {
        tasksAPI.updateTask(todolistId, taskId,"New TASK NAME!!!!").then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'cdc88cc2-21c8-498f-b19c-c2ad7b550d64'
    const taskId = 'fe67fa42-5d65-494e-8448-974e73bcd1c3'
    useEffect(() => {
        tasksAPI.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}



