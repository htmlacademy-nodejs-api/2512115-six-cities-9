import { CityEnum } from "../enums/city.enum.js";
import { UserType } from "./user.type.js";

export type OfferType = {
    title: string;
    description: string;
    postDate: Date;
    city: CityEnum;
    previewImage: string;
    images: string[];
    isPremium: boolean;
    rating: number;
    type: string;
    bedrooms: number;
    maxAdults: number;
    price: number;
    goods: string[];
    user: UserType;
    location: {
      latitude: number;
      longitude: number;
    }
  }

