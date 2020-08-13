import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '0ec4be5c-05ae-403f-b660-0e7e553f2d34'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

// api
export const authAPI = {
    me() {
        const promise = instance.get('/auth/me');
        return promise;
    },
    logout(){
        const promise = instance.delete('/auth/login');
        return promise;
    },
    login(data:LoginParamsType){
        const promise = instance.post('/auth/login',data);
        return promise;
    }
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
