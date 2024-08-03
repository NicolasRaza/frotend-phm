  //import { UserService } from 'src/app/services/user.service';
  import { Component } from '@angular/core';
  import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
  import { LodgingService } from 'src/app/services/lodging.service';
  import { UserService } from 'src/app/services/user.service';


  @Component({
    selector: 'app-modalAddLodging',
    templateUrl: './modalAddLodging.component.html',
    styleUrls: ['./modalAddLodging.component.scss']
  })
  export class ModalAddLodgingComponent {
    
    defaultImageUrl = 'https://blog-eeuu.com/wp-content/uploads/2009/05/hoteles-estados-unidos.jpg'; // URL de imagen por defecto
    imageUrl: string = ""
    nombre: string = "";
    descripcion: string = "";
    aspecto: string = "";
    detalle: string = "";
    capacidad: number | null = null;
    habitaciones: number | null = null;
    banios: number | null = null;
    limpieza: boolean = false;
    costoBase: number | null = null;
    limpiezaChecked = false;
    disableButton = true;
    alojamientoType : string = ""
    pais : string = ""
    direccion : string = ""

    constructor(public dialogRef: MatDialogRef<any>, private lodgingService : LodgingService,private userService : UserService,private snackBar : MatSnackBar) { }




    checkFields(): void {
      this.disableButton = !(this.nombre && this.descripcion && this.capacidad && this.habitaciones && this.banios && this.costoBase 
        && this.alojamientoType && this.pais && this.aspecto && this.detalle && this.limpieza && this.direccion);
    }
    

    loadImage(): void {
      if(this.imageUrl !== ""){
      this.defaultImageUrl = this.imageUrl;}
    }

    onSubmit(): void {
      if (!this.imageUrl) {
        this.imageUrl = this.defaultImageUrl;
      }
      
      const lodging = {
          name: this.nombre,
          image: this.imageUrl,
          country: this.pais,
          address: this.direccion,
          baseCost : this.costoBase,
          creatorId : this.userService.userLogeado.id,    
          type : this.alojamientoType,
          description: this.descripcion ,
          aspects : this.aspecto,
          capacity: this.capacidad,
          numOfRooms : this.habitaciones,
          numOfBathrooms : this.banios,
          detailLodging : this.detalle ,
          houseKeeping : this.limpieza,
        };

        const alojamientoJson = JSON.stringify(lodging);
        this.lodgingService.postLodging(lodging).subscribe((lodgingsData) =>{
          this.dialogRef.close(lodgingsData)
          this.snackBar.open('Hospedaje agregado con éxito', '', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
        },  (error) => {
          console.log(error);
          this.snackBar.open('Error al eliminar Hospedaje ', '', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
        
        )

      };
      


    onCancel(): void {
      this.dialogRef.close();
    }
  }

  export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }