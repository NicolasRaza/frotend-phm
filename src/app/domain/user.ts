import * as moment from 'moment';
import { UserDTO } from '../DTO/user.dto';

export class User {
  constructor(
    public id?: number,
    public name: string = '',
    public userName: string = '',
    public birthDay: Date = new Date(),
    public nationality: string = '',
    public balance: number = 0,
    public profileImageURL: string = '',

    // User account information
    public email: string = '',
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date = new Date()
  ) {}

  toDTO(): UserDTO {
    return {
      id: this.id,
      balance: this.balance,
      birthDay: this.birthDay,
      nationality: this.nationality,
      createdAt: undefined,
      deletedAt: undefined,
      email: this.email,
      profileImageURL: this.profileImageURL,
      name: '',
      userName: this.userName,
      updatedAt: undefined,
    };
  }

  addToBalance(amount: number) {
    this.balance += amount;
  }

  removeFromBalance(amount: number) {
    this.balance -= amount;
  }

  // getAge() {
  //   const ahora = new Date();
  //   var edad = ahora.getFullYear() - this.birthDay.getFullYear();
  //   const diferenciaMeses = ahora.getMonth() - this.birthDay.getMonth();
  //   if (diferenciaMeses < 0 || (diferenciaMeses === 0 && ahora.getDate() < this.birthDay.getDate())) {
  //     edad--;
  //   }
  // return edad;
  // }

  getAge() {
    const ahora = new Date();
    const fecha = new Date(this.birthDay);
    var edad = ahora.getFullYear() - fecha.getFullYear();
    const diferenciaMeses = ahora.getMonth() - fecha.getMonth();
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && ahora.getDate() < fecha.getDate())
    ) {
      edad--;
    }
    return edad;
  }
  getImage() {
    if (this.profileImageURL != null && this.profileImageURL.length > 0) {
      return this.profileImageURL;
    } else {
      return '../../assets/imgs/default-user-image-2.png';
    }
  }

  getCountry() {
    return this.nationality;
  }

  getName() {
    return this.userName;
  }

  isValid() {
    return (
      this.name.length > 0 &&
      this.userName.length > 0 &&
      this.nationality.length > 0 &&
      this.birthDay != null &&
      this.deletedAt == null
    );
  }
}

export function userFromDTO(userDTO: UserDTO) {
  return Object.assign(new User(), userDTO, {});
}
