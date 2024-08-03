import { Lodging } from 'src/app/domain/lodging';
import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LodgingService } from 'src/app/services/lodging.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.scss'],
})
export class CardAreaComponent {
  @Input() lodgings: Lodging[] = [];
  @Input() error: boolean = true;
  @Input() toDate!: string | undefined;
  @Input() fromDate!: string | undefined;
  @Input() disableRedirect: boolean = true;
  @Input() capacity!: number | undefined;

  constructor(private http: HttpClient, private lodgingService : LodgingService, private router: Router) {}

  ngOnInit(): void {}

  onCardClick(lodgingId?: number) {
    this.countClick(lodgingId).then(() => {
      this.router.navigate(['/detail', lodgingId]);
    });
    
  }

  async countClick(lodgindId?: number) {
    console.log('Contador sss');
    (await this.lodgingService.countClick(lodgindId)).subscribe(
      () => {
        console.log('Contador incrementado');
      },
      (error) => {
        console.error('Error al incrementar el contador:', error);
      }
    );
  }
}
