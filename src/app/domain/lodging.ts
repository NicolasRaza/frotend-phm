import * as moment from 'moment';
import { LodgingDTO } from '../DTO/lodging.dto';
import { LodgingDetail } from './lodging-detail';

//create class lodging
export class Lodging {
  constructor(
    public id?: number,
    public name: string = '',
    public country: string = '',
    public address: string = '',
    public description: string = '',
    public baseCost: number = 0,
    public totalCost: number = 0,
    public image: string = '',
    public averageScore: number = 0,
    public capacity: number = 0
  ) {}

  getName() {
    return this.name;
  }

  getLocation() {
    return `${this.country}, ${this.address}`;
  }

  getDescription() {
    return this.description;
  }

  getCostPerNight() {
    return this.baseCost;
  }

  getTotalCost() {
    return this.totalCost;
  }

  getImage() {
    return this.image;
  }

  getScore() {
    return this.averageScore;
  }

  setName(name: string) {
    this.name = name;
  }

  setCountry(country: string) {
    this.country = country;
  }

  setAddress(address: string) {
    this.address = address;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setCostPerNight(baseCost: number) {
    this.baseCost = baseCost;
  }

  setTotalCost(totalCost: number) {
    this.totalCost = totalCost;
  }

  setImage(image: string) {
    this.image = image;
  }

  setScore(averageScore: number) {
    this.averageScore = averageScore;
  }

  //create method to convert lodging to dto
  toDTO(): LodgingDTO {
    return {
      id: this.id,
      name: this.name,
      country: this.country,
      address: this.address,
      description: this.description,
      baseCost: this.baseCost,
      totalCost: this.totalCost,
      image: this.image,
      averageScore: this.averageScore,
      capacity: this.capacity,
    };
  }

  static fromDTO(lodgingDTO: LodgingDTO): Lodging {
    return Object.assign(new Lodging(), lodgingDTO);
  }

  isValid() {
    return (
      this.name.length > 0 &&
      this.country.length > 0 &&
      this.address.length > 0 &&
      this.description.length > 0 &&
      this.baseCost > 0 &&
      this.totalCost > 0 &&
      this.image.length > 0 &&
      this.averageScore >= 0
    );
  }

  getCapacity() {
    return this.capacity;
  }

  getCostPerDay(
    toDate: string | undefined,
    fromDate: string | undefined
  ): number {
    if (!toDate || !fromDate) {
      return 0;
    }
    const days = getDays(toDate, fromDate);
    return this.baseCost * days;
  }
}

export function fromDetailToLodging(detail: LodgingDetail): Lodging {
  return new Lodging(
    detail.id,
    detail.name,
    detail.country,
    detail.address,
    detail.description,
    detail.baseCost,
    detail.totalCost,
    detail.image,
    detail.averageScore,
    detail.capacity
  );
}

function getDays(toDate: string, fromDate: string) {
  return moment(toDate, 'D/M/YYYY').diff(moment(fromDate, 'D/M/YYYY'), 'days');
}
