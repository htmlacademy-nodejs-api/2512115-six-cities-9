import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { OfferType, UserType } from '../../types/index.js';
import { SEMICOLON } from '../../const/const.js';
import { CityEnum } from '../../enums/city.enum.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private validateRawData(): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): OfferType[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): OfferType {
    const [
      title,
      description,
      postDate,
      city,
      previewImage,
      images,
      isPremium,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      user,
      location
    ] = line.split('\t');

    const [lat, lon] = location.split(SEMICOLON);

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: city as CityEnum,
      previewImage,
      images: this.parseImages(images),
      isPremium: isPremium.toLocaleLowerCase() === 'true',
      rating: Number(rating),
      type,
      bedrooms: Number(bedrooms),
      maxAdults: Number(maxAdults),
      price: Number(price),
      goods: this.parseGoods(goods),
      user: this.parseUser(user),
      location: {
        latitude: Number(lat),
        longitude: Number(lon)
      },
    };
  }

  private parseGoods(goodsString: string): string[] {
    return goodsString.split(SEMICOLON);
  }

  private parseImages(imagesString: string): string[] {
    return imagesString.split(SEMICOLON);
  }

  private parseUser(user: string): UserType {
    const [name, email, avatarPath, isPro] = user.split(SEMICOLON);
    return { name, email, avatarPath, isPro: isPro === 'true' };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): OfferType[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
