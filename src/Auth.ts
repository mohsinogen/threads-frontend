import axios from "axios";
import { URL } from "./utils/constants";

const getUserInfo = () =>{
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser;
    } else {
        return null;
    }
}


const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(URL+'api/users/login', { email:username, password });
      const newUser: any = response.data.data;
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      // Handle login error
      console.error('Error logging in:', error);
    }
  };

export {getUserInfo, login};