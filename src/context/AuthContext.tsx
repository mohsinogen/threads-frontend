import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { URL } from "../utils/constants";
import Axios from "../utils/helper";
import User from "../models/user.model";



// Define the context interface
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string) => Promise<any>;
  logout: ()=> void
}

// Create the initial context value
const initialContextValue: AuthContextType = {
  user: null,
  login: async () => {/*  */},
  register: async () => {/*  */},
  logout: () => {/*  */}
};

// Create the Auth Context
const AuthContext = createContext<AuthContextType>(initialContextValue);

// Export the Auth Context for use in components
export default AuthContext;

// Create and export the Auth Provider component
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // State to hold the user information
  const [user, setUser] = useState<User | null>(null);

  // useEffect to retrieve user information from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to handle user login
  const login = async (email: string, password: string) => {
    const response = await Axios.post(URL + `api/users/login`, {
      email,
      password,
    });
    // Assuming the API returns the user object upon successful login
    const user = response.data.data;
    setUser(user);
    localStorage.setItem("userInfo", JSON.stringify(user));
    return response;
  };

  // Function to handle user registration
  const register = async (name: string, email: string, password: string) => {
    const response = await Axios.post(URL + `api/users`, {
      email,
      password,
      name,
    });
    // Assuming the API returns the user object upon successful registration
    const user = response.data.data;
    setUser(user);
    localStorage.setItem("userInfo", JSON.stringify(user));
    return response;
  };

  const logout = () =>{
    setUser(null);
    localStorage.removeItem("userInfo")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
