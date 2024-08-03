export interface UserDTO {
  id?: number;
  name: string;
  userName: string;
  birthDay: Date;
  nationality: string;
  balance: number;
  profileImageURL: string;

  // User account information
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

