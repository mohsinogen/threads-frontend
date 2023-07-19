import { URL } from "./constants";
import Axios from "./helper";

const login=async(email:string, password: string)=>{
    const response = await Axios.post(URL+`api/users/login`, {email,password});
    return response;
}

const getThreads=async(token:string)=>{
    const response = await Axios.get(URL+`api/threads`, {headers:{'Authorization':`Bearer ${token}`}});
    return response;
}

export {login,getThreads};