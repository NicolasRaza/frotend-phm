
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modalAddReview',
  templateUrl: './modalAddReview.component.html',
  styleUrls: ['./modalAddReview.component.css']
})
export class ModalAddReviewComponent  {

  comment: string = "";
  score: number = 0;
  scoreOptions = [0,1, 2, 3, 4, 5];

  constructor(
    public dialogRef: MatDialogRef<ModalAddReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.comment = data.comment;
    this.score = data.score
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({ comment: this.comment, score: this.score });
  }

  isFormValid(): boolean {
    console.info(this.score)
    return  this.comment !== "" ;
  }

  ngOnInit() {
  }

}
