import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { NewuserComponent } from './components/newuser/newuser.component';
import { FooterComponent } from './components/footer/footer.component';
import { UpdateuserComponent } from './components/user/updateuser/updateuser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { C404Component } from './components/c404/c404.component';
import { UserviewComponent } from './components/userview/userview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UserComponent,
    NewuserComponent,
    FooterComponent,
    UpdateuserComponent,
    C404Component,
    UserviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
