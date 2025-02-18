import { UserType } from "./user.type.js";

export type ReviewType = {
  comment: string;
  date: Date;
  rating: number;
  user: UserType;
  }
