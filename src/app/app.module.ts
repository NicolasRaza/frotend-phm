import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ModalModule } from './modals/modal/modal.module';

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatIconModule,
    MatDatepickerModule,
    ModalModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
