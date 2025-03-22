import { FileReader } from './file-reader.interface.js';
import { OfferType, UserType } from '../../types/index.js';
import { SEMICOLON } from '../../const/const.js';
import { CityEnum } from '../../enums/city.enum.js';
import { EventEmitter } from 'node:events';
import { createReadStream } from 'node:fs';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(
    private readonly filename: string
  ) {
    super();
  }


  private parseLineToOffer(line: string): OfferType {
    const [
      title,
      description,
      // postDate,
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
      // postDate: new Date(postDate),
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8'
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();
      nextLinePosition = remainingData.indexOf('\n');

      while (nextLinePosition >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }
    this.emit('end', importedRowCount);
  }
}

