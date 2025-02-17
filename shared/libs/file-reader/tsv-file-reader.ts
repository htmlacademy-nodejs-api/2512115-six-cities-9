import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, User } from '../../types/index.js';

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

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      postDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      host,
      location
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city,
      previewImage,
      images: this.parseImages(images),
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price: this.parsePrice(price),
      goods: this.parseGoods(goods),
      host: this.parseHost(name, email, avatarPath, isPro),
      location,
    };
  }

  private parseGoods(goodsString: string): { name: string }[] {
    return goodsString.split(';').map((name) => ({ name }));
  }

  private parseImages(imagesString: string): { name: string }[] {
    return imagesString.split(';').map((name) => ({ name }));
  }

  private parsePrice(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseHost(name: string, email: string, avatarPath: string, isPro: boolean): User {
    return { name, email, avatarPath, isPro };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
