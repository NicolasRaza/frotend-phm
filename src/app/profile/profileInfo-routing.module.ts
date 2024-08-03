import { PurchasedReservesComponent } from './purchased-reserves/purchased-reserves.component';
import { PostComponent } from './post/post.component';
import { ProfileInfoComponent } from './profileinfo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends/friends/friends.component';
import { CommentsComponent } from './comments/comments/comments.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'purchased-reserves',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ProfileInfoComponent,
    children: [
      {
        path: 'purchased-reserves',
        component: PurchasedReservesComponent
        
      },
      {
        path: 'friends',
        component: FriendsComponent
      },
      {
        path: 'comments',
        component: CommentsComponent
      }
      ,
      {
        path: 'posts',
        component: PostComponent
      },
      {
        path: '',
        redirectTo: 'purchased-reserves',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }


