import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule, MatRippleModule } from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from '@angular/material'
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { HttpClientModule } from "@angular/common/http";

import 'hammerjs';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { DishService } from "./services/dish.service";
import { PromotionService } from "./services/promotion.service";
import { LeaderService } from "./services/leader.service";

import { baseURL } from './shared/baseurl';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
  ],
  providers: [
    DishService,
    PromotionService,
    LeaderService,
    {provide: 'BaseURL', useValue: baseURL}

  ],
  entryComponents: [
    LoginComponent
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
