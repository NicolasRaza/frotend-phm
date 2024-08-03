import { MatInputModule } from '@angular/material/input';

import { ProfileInfoComponent } from './profileinfo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profileInfo-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { PurchasedReservesComponent } from './purchased-reserves/purchased-reserves.component';
import { MatRippleModule } from '@angular/material/core';
import { PostComponent } from './post/post.component';
import { SharedModule } from '../shared/shared.module';
import { FriendsComponent } from './friends/friends/friends.component';
import { CommentsComponent } from './comments/comments/comments.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { ModalModule } from '../modals/modal/modal.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ProfileInfoComponent,
    PurchasedReservesComponent,
    PostComponent,
    FriendsComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    FormsModule,
    MatRippleModule,
    SharedModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    ModalModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
})
export class ProfileModule {}
