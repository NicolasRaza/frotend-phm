import { LodgingDetailDTO } from '../DTO/lodging-detail.dto';

//create class lodging
export class LodgingDetail {
  constructor(
    public id?: number,
    public name: string = '',
    public averageScore: number = 0,
    public image: string = '',
    public address: string = '',
    public country: string = '',
    public description: string = '',
    public detailLodging: string = '',
    public aspects: string = '',
    public baseCost: number = 0,
    public totalCost: number = 0,
    public capacity: number = 0,
    public houseKepping: boolean = true,
    public numOfRooms: number = 0,
    public numOfBathrooms: number = 0,
  ) {}


  //create method to convert lodging to dto
  toDTO(): LodgingDetailDTO {
    return {
      id: this.id,
      name: this.name,
      averageScore: this.averageScore,
      image: this.image,
      address: this.address,
      country: this.country,
      description: this.description,
      detailLodging: this.detailLodging,
      aspects: this.aspects,
      baseCost: this.baseCost,
      totalCost: this.totalCost,
      capacity: this.capacity,
      houseKepping: this.houseKepping,
      numOfRooms: this.numOfRooms,
      numOfBathrooms: this.numOfBathrooms,
    };
  }

  fromDTO(lodgingDetailDTO: LodgingDetailDTO): LodgingDetail {
    return Object.assign(new LodgingDetail(), lodgingDetailDTO);
  }

  isValid() {
    return (
      this.name.length > 0 &&
      this.address.length > 0 &&
      this.description.length > 0 &&
      this.baseCost > 0 &&
      this.totalCost > 0 &&
      this.image.length > 0 &&
      this.averageScore >= 0
    );
  }

}
