import { Component, Input} from '@angular/core';
import {LodgingDetail} from "../../domain/lodging-detail";
import { BookingService } from 'src/app/services/booking.service';
import { BookingDTO } from 'src/app/DTO/booking.dto';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-reserve-box',
  templateUrl: './reserve-box.component.html',
  styleUrls: ['./reserve-box.component.scss']
})
export class ReserveBoxComponent {

  fromDate!: Date | undefined;
  toDate: Date | undefined = undefined;
  minToDate: Date = new Date();
  currentDate = new Date();
  capacity!: number | undefined;

  onFromDateChange() {
    this.minToDate = this.fromDate ?? this.minToDate;
    if (this.fromDate && (!this.toDate || this.fromDate > this.toDate)) {
      this.toDate = this.fromDate;
    }
    if (this.fromDate && this.toDate && this.capacity!>0 && this.capacity!<=this.lodging.capacity) {
      return true
    }
    else {
      return false
      console.log(this.capacity)
    }
  }

  costoTotal(){
    if (!this.toDate){
      return this.lodging.baseCost
    }
    if(moment(this.toDate).diff(moment(this.fromDate), 'days')==0){
      return this.lodging.baseCost
    }

    return (this.lodging.baseCost * (moment(this.toDate).diff(moment(this.fromDate), 'days')));
  }

  @Input() lodging!: LodgingDetail
  @Input() toDateStr!: string | undefined;
  @Input() fromDateStr!: string | undefined;
  @Input() capacityValue!: number | undefined;

  ngOnInit() {
    Promise.resolve().then(() => {
      this.fromDate = this.convertirFecha(this.fromDateStr);
      this.toDate = this.convertirFecha(this.toDateStr);
      this.capacity = this.capacityValue;
      return this.onFromDateChange();
    });
  }
  constructor(private readonly bookingService: BookingService,
              private readonly authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  async doBooking() {
    console.log(this.fromDate, this.toDate)
    console.log("Reservando: ", this.lodging)
    let userLoged: any;
    console.log("Usuario logeado: ", userLoged)

    try {
      userLoged = await this.authService.currentUser();
    } catch (error) {
      if(!userLoged) {
        this.snackBar.open('Error al crear la reserva sin usuario', '', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        this.router.navigate(['/authentication/login']);
        return
      }
    }

    let booking: BookingDTO = {
      lodgingId: this.lodging.id!,
      userId: userLoged.id,
      fromDate: this.fromDate,
      toDate: this.toDate!,
      totalCost: this.costoTotal(),
      numberOfGuests:this.capacity
    }

    console.log("Booking to add: ", booking)

    this.bookingService.createBooking(booking).subscribe( {
      next: (v: {
        message: string;
      }) => {
        this.snackBar.open('Reserva creada exitosamente', '', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.snackBar.open('Error al crear la reserva', '', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    })
  }

  convertirFecha(fechaString: string | undefined): Date | undefined {
    if (!fechaString) {
      return undefined;
    }

    const partes = fechaString.split('/');
    const dia = +partes[0];
    const mes = +partes[1] - 1; // Los meses en JavaScript son base 0 (enero = 0)
    const anio = +partes[2];
  
    return new Date(anio, mes, dia);
  }
}
