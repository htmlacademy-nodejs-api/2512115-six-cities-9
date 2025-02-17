import { City } from "./city.type";
import { User } from "./user.type";

export type Offer = {
    title: string;
    description: string;
    postDate: Date;
    city: City;
    previewImage: string;
    images: [string];
    isPremium: boolean;
    isFavorite: boolean;
    rating: number;
    type: string;
    bedrooms: number;
    maxAdults: number;
    price: number;
    goods: [string];
    host: User;
    location: {
      latitude: number;
      longitude: number;
    }
  }

