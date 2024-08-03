import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Lodging } from 'src/app/domain/lodging';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dig-card',
  templateUrl: './dig-card.component.html',
  styleUrls: ['./dig-card.component.scss'],
})
export class DigCardComponent {

  constructor(private router: Router) {}

  @Input() i!: number;
  @Input() lodging!: Lodging;
  @Input() button_delete = false;
  @Input() button_qualify = false;
  @Output() deletePost = new EventEmitter<number>();
  @Output() qualifyPost = new EventEmitter<number>();
  @Input() toDate!: string | undefined;
  @Input() fromDate!: string | undefined;
  @Input() disableRedirect = false;
  @Input() capacity!: number | undefined;
  @Input() showGuest = false;
  @Input() totalCost! : number ;

  onDeleteClick(lodging: Lodging) {
    this.deletePost.emit(lodging.id);
    if (!this.disableRedirect) {
      this.disableRedirect = true;
    }
  }

  onQualifyClick(i: number) {
    this.qualifyPost.emit(i);
    if (!this.disableRedirect) {
      this.disableRedirect = true;
    }
  }

  isInProfile(){

  }
  
  redireccionar(lodging: any) {
    this.router.navigate(['/detail', lodging.id], {
      queryParams: { fromDate: this.fromDate, toDate: this.toDate, capacity: this.capacity }
    });
  }
}
