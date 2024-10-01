import { Category } from "./Category.interface";

export interface Responsible {
  id: string;
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  createDate: string;
  updateDate: string;
  categories: Category[] | [];
  token: string;
}
