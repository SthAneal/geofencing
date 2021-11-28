import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GeofencingModule } from './geofencing/geofencing.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GeofencingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
