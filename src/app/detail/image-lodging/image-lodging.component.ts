import {Component, Input} from '@angular/core';
import {LodgingDetail} from "../../domain/lodging-detail";

@Component({
  selector: 'app-image-lodging',
  templateUrl: './image-lodging.component.html',
  styleUrls: ['./image-lodging.component.scss']
})
export class ImageLodgingComponent {
  @Input() lodging!: LodgingDetail
}
