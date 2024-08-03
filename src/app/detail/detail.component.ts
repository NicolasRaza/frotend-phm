import { Component, Input } from '@angular/core';
import {LodgingDetail} from "../domain/lodging-detail";
import {User} from "../domain/user";
import { Review } from '../domain/review';
import { LodgingService } from '../services/lodging.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LodgingDetailDTO } from '../DTO/lodging-detail.dto';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  
  comment!: Array<any> ; 
  toDate!: string | undefined;
  fromDate!: string | undefined;
  capacity!: number | undefined;
  lodging: LodgingDetail = {
    name: '',
    averageScore: 0,
    image: '',
    address: '',
    country: '',
    description: '',
    detailLodging: '',
    aspects: '',
    baseCost: 0,
    totalCost: 0,
    capacity: 0,
    houseKepping: false,
    numOfRooms: 0,
    numOfBathrooms: 0,
    toDTO: function (): LodgingDetailDTO {
      throw new Error('Function not implemented.');
    },
    fromDTO: function (lodgingDetailDTO: LodgingDetailDTO): LodgingDetail {
      throw new Error('Function not implemented.');
    },
    isValid: function (): boolean {
      throw new Error('Function not implemented.');
    }
  };
  isLoading: boolean = true;

  constructor(public lodgingService: LodgingService,private router: Router, private route: ActivatedRoute,private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.route.params.subscribe((detailsParameters) => {
      const lodging = this.lodgingService.getOne(detailsParameters['id'])
      lodging.then(data => {
        this.lodging = data
      })
      const commentProfile = this.reviewService.getReviewForLodging(detailsParameters['id'])
    commentProfile.then((data) => {
      this.comment = data
    console.log("este log: ", this.comment)
    })
    })
    
    this.route.queryParams.subscribe(params => {
      this.fromDate = params['fromDate'];
      this.toDate = params['toDate'];
      this.capacity = +params['capacity'];
  
      console.log("fromDate: ", this.fromDate)
      console.log("toDate: ", this.toDate)
      console.log("capacity: ", this.capacity)
    });
   
}

}
