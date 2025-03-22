import { MAX_GUESTS_NUMBER, MAX_RATING, MAX_RENT_PRICE, MAX_ROOMS_NUMBER, MIN_GUESTS_NUMBER, MIN_RATING, MIN_RENT_PRICE, MIN_ROOMS_NUMBER, SEMICOLON, TAB } from '../../const/const.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { OfferGenerator } from './offer-generator.interface.js';


export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const city = getRandomItem(this.mockData.cities);
    const preview = getRandomItem(this.mockData.previews);
    const images = getRandomItem(this.mockData.images);
    const premium = getRandomItem(this.mockData.boolean);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING);
    const housingType = getRandomItem(this.mockData.housingTypes);
    const roomsNumber = generateRandomValue(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER);
    const guestsNumber = generateRandomValue(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER);
    const rentPrice = generateRandomValue(MIN_RENT_PRICE, MAX_RENT_PRICE);
    const comforts = getRandomItems(this.mockData.comforts).join(SEMICOLON);
    const coordinate = [generateRandomValue(1, 1000), generateRandomValue(1, 1000)].join(SEMICOLON);

    const authorName = getRandomItem(this.mockData.authorNames);
    const authorEmail = getRandomItem(this.mockData.authorEmails);
    const authorAvatar = getRandomItem(this.mockData.authorAvatars);
    const authorStatus = getRandomItem(this.mockData.boolean);

    const author = [authorName, authorEmail,authorAvatar,authorStatus ].join(SEMICOLON);

    const result = [
      title,
      description,
      city,
      preview,
      images,
      premium,
      rating,
      housingType,
      roomsNumber,
      guestsNumber,
      rentPrice,
      comforts,
      author,
      coordinate
    ].join(TAB);

    return result;
  }
}
