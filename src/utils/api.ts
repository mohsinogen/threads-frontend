import { URL } from "./constants";
import Axios from "./helper";

const login=async(email:string, password: string)=>{
    const response = await Axios.post(URL+`api/users/login`, {email,password});
    return response;
}

export {login};