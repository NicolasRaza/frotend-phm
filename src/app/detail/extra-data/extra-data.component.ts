import { Component, Input } from '@angular/core';
import { LodgingDetail } from 'src/app/domain/lodging-detail';

@Component({
  selector: 'app-extra-data',
  templateUrl: './extra-data.component.html',
  styleUrls: ['./extra-data.component.scss']
})
export class ExtraDataComponent {

  @Input() lodging!: LodgingDetail
}
