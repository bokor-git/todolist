type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

type ActionsType = SetErrorActionType| SetStatusActionType

export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setErrorAC = (error: string|null) => ({type: 'APP/SET-ERROR', error} as const)


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SetStatusActionType = ReturnType<typeof setStatusAC>