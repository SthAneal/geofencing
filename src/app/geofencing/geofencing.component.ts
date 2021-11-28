import { Component, OnInit, Renderer2, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-geofencing',
  templateUrl: './geofencing.component.html',
  styleUrls: ['./geofencing.component.scss']
})
export class GeofencingComponent implements OnInit {

  // good reference :: https://www.thecodehubs.com/integrate-google-maps-in-angular/
  // or all sets of MVCObject :: http://definitelytyped.org/docs/googlemaps.infobubble--google.maps.infobubble/classes/google.maps.size.html
  
  drawingManager: any;

  constructor(private renderer2:Renderer2, @Inject(DOCUMENT) private document:Document){}

  private loadMap(){
    const url = 'https://maps.googleapis.com/maps/api/js?libraries=drawing&v=weekly';
    this.loadScript(url).then(() => this.initMap());
  }

  // create <script> </script> tag to assert into the main html page
  private loadScript(url: string) {
    return new Promise((resolve, reject) => {
      const script = this.renderer2.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.text = ``;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      this.renderer2.appendChild(this.document.head, script);
    })
  }

  // create map
  initMap():void{
    var center:google.maps.LatLngLiteral = {lat:-37.840935,lng:144.946457};

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        center = {
          lat: position.coords.latitude,
          lng:position.coords.longitude
        }
        // generate marker
        //this.addMarker(center);
      });
    }

    const map = new google.maps.Map(this.document.getElementById("map") as HTMLElement, {
      zoom: 12,
      center,
      mapTypeId:'hybrid',
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: true,
      maxZoom: 30,
      minZoom: 5,
      streetViewControl: false,
      rotateControl: false,
    });

    // create a common info window for markers
    const markerInfoWindow = new google.maps.InfoWindow();


    // make a marker when click on the map
    map.addListener('click', (mapsMouseEvent: { latLng: google.maps.LatLngLiteral | google.maps.LatLng; }) =>{
      
      // lets create a marker instance for each time user clicks on map
      let marker:google.maps.Marker = new google.maps.Marker({
        position:mapsMouseEvent.latLng,
        draggable:true,
        map
      });

      // attach dragend event to the marker

      // ---- both of the examples below works fine -----//
      // insteade as using type any of a variable, i would like to use second example///

     /*  google.maps.event.addListener(marker,'dragend', function(markerDragendEvent:any){
        console.log(markerDragendEvent.latLng.lat().toFixed(6));
      }) */

      marker.addListener('dragend', function(){
        console.log(marker.getPosition()?.lat());
      });

      // attach the clicke event on the marker to pop up the info window
      marker.addListener('click', () =>{
        marker.setTitle('Title of Marker');

        markerInfoWindow.setOptions({
          content:'Hi !!',
          position:marker.getPosition()
        });
        
        markerInfoWindow.open({
          map,
          anchor:marker // anchor will make the info window to appear at the top of the Marker
        });
      });
    });
  }

  ngOnInit(): void {
    this.loadMap();
  }
}
