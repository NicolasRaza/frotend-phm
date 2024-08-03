import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/domain/user';

@Component({
  selector: 'app-modalChangePicture',
  templateUrl: './modalChangePicture.component.html',
  styleUrls: ['./modalChangePicture.component.css']
})
export class ModalChangePictureComponent  {


  imgUrl! : string;

  constructor(@Inject(MAT_DIALOG_DATA) public imgProfile: string, public dialogRef: MatDialogRef<any>) {
    this.imgUrl = imgProfile; 
   }

  ngOnInit() {

   }



  loadImage(): void {
    console.info(this.imgUrl)
    this.dialogRef.close(this.imgUrl)
  }
}
