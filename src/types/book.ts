export type BookCategory =
  | "Fiction"
  | "Science"
  | "History"
  | "Kids"
  | "Others";

export const bookCategories: BookCategory[] = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: BookCategory;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  addedByName: string;
  addedByEmail: string;
  createdAt: string;
}
