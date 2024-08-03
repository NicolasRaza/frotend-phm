//create interface lodging dto
export interface LodgingDTO {
  id?: number;
  name: string;
  country: string;
  address: string;
  description: string;
  baseCost: number;
  totalCost: number;
  image: string;
  averageScore: number;
  capacity: number;
}

export interface FilterRequestLodingDTO {
  destination?: string;
  fromdate?: string;
  todate?: string;
  capacity?: number;
  userId?: number;
  [index: string]: any;
}
