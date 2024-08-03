import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modalAddValue',
  templateUrl: './modalAddValue.component.html',
  styleUrls: ['./modalAddValue.component.css']
})
export class ModalAddValueComponent {

  minValue = 1

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}

