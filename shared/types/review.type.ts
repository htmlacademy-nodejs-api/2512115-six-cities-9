import { User } from "./user.type";

export type Review = {
  comment: string;
  date: Date;
  rating: number;
  user: User;
  }
