//create interface lodging dto
export interface LodgingDetailDTO {
  id?: number,
  name: string,
  averageScore: number,
  image: string ,
  address: string ,
  country: string ,
  description: string ,
  detailLodging: string ,
  aspects: string ,
  baseCost: number ,
  totalCost: number ,
  capacity: number ,
  houseKepping: boolean ,
  numOfRooms: number ,
  numOfBathrooms: number ,
}
