import { LOCALE_ID } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DigCardComponent } from '../shared/dig-card/dig-card.component';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatDividerModule } from '@angular/material/divider';
import { CardCommentComponent } from './card-comment/card-comment.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
//import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [NavBarComponent, DigCardComponent, CardCommentComponent],
  providers:[
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatBadgeModule,
    CdkMenuModule,
    MatTooltipModule,
    ///MatSnackBarModule
  ],
  exports: [NavBarComponent, DigCardComponent, CardCommentComponent],
})
export class SharedModule {}

