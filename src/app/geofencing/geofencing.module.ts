import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeofencingComponent } from './geofencing.component';
import { Routes, RouterModule } from '@angular/router';
import { GoogleMapsModule} from '@angular/google-maps';
import { FlexLayoutModule } from '@angular/flex-layout';
// to support lazyloading
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: GeofencingComponent
  }
]

@NgModule({
  declarations: [
    GeofencingComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    FlexLayoutModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forChild(routes),
  ],
  exports:[GeofencingComponent]
})
export class GeofencingModule { }
