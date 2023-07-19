import { URL } from "./constants";
import Axios from "./helper";

const login=async(email:string, password: string)=>{
    const response = await Axios.post(URL+`api/users/login`, {email,password});
    return response;
}

const register=async(name:string, email:string, password: string)=>{
    const response = await Axios.post(URL+`api/users`, {email,password, name});
    return response;
}

const updateUserProfile=async(data:object)=>{
    const response = await Axios.put(URL+`api/users/profile`, {...data});
    return response;
}

const getThreads=async(token:string, page:number)=>{
    const response = await Axios.get(URL+`api/threads?page=${page}`, {headers:{'Authorization':`Bearer ${token}`}});
    return response;
}
const getThreadsByUser=async(token:string, page:number, user:string)=>{
    const response = await Axios.get(URL+`api/threads/user/${user}?page=${page}`, {headers:{'Authorization':`Bearer ${token}`}});
    return response;
}

export {login,register,getThreads, getThreadsByUser, updateUserProfile};