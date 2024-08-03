import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalAddValueComponent } from './modalAddValue/modalAddValue.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalAddReviewComponent } from './modalAddReview/modalAddReview.component';
import { MatSelectModule } from '@angular/material/select';
import { ModalAddLodgingComponent } from './modalAddLodging/modalAddLodging.component';
import { ModalAddFriendComponent } from './modalAddFriend/modalAddFriend.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ModalChangePictureComponent } from './modalChangePicture/modalChangePicture.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [ModalAddValueComponent,ModalAddReviewComponent,ModalAddLodgingComponent, ModalAddFriendComponent,ModalChangePictureComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  exports : [ModalAddValueComponent,ModalAddReviewComponent,ModalAddLodgingComponent,ModalAddFriendComponent,ModalChangePictureComponent]
})
export class ModalModule {}