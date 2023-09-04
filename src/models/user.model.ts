export default interface User {
    name: string;
    email: string;
    profile?: string;
    bio?: string;
    followers: string[];
    following: string[];
    link?: string;
    uid: string,
  }