import { User } from "./user";
import { Book } from "./book";

interface OrderData {
 amount: number;
}

export interface Order extends OrderData {
  _id: string;
  user: User;
  book: Book;
}


