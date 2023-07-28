export default interface User {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    profile?: string;
    createdAt: string;
    updatedAt: string;
    __v: any;
    bio?: string;
    followers: string[];
    following: string[];
    link?: string;
    token: string;
  }