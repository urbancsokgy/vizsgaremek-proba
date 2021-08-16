import { Author } from "./author";
import { Category } from "./category";

interface BookData {
  title: string;
  description?: string;
  price: number;
  quantity: number;
}

export interface Book extends BookData {
  _id: string;
  category?: Category;
  author: Author;
}

export interface BookSave extends BookData {
  category?: string;
  author: string;
}

export interface BookEdit extends BookSave {
  _id: string;
}
