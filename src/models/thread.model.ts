import User from "./user.model";

export default interface Thread {
  _id: string;
  author: User;
  content: string;
  likes: string[];
  parentThread: null | string;
  createdAt: string;
  updatedAt: string;
  __v: any;
}
