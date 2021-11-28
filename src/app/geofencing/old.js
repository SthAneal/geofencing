var runMaps = function() {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                zoom: 18,
              // controls
                panControl: true,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                overviewMapControl: true,
                rotateControl: true
            });
          
           // Define the LatLng coordinates for the polygon's path.  
             const siteCoords = [
               { lat: -37.78693, lng: 144.85755  },
               { lat: -37.78702, lng: 144.85752 },
               { lat: -37.78711, lng: 144.85753 },
               { lat: -37.78713, lng: 144.85759 },
               { lat: -37.78712, lng: 144.85761 },
               { lat: -37.78714, lng: 144.8577 },
               { lat: -37.78704, lng: 144.85772 },
               { lat: -37.78694, lng: 144.85771 }
             ];
             // Construct the polygon.
             const site1 = new google.maps.Polygon({
               paths: siteCoords,
               strokeColor: "#FF0000",
               strokeOpacity: 0.8,
               strokeWeight: 2,
               fillColor: "#FF0000",
               fillOpacity: 0.35,
             });

             site1.setMap(map);
          
          
            google.maps.event.addListener(map, 'click', function(event) {
                placeMarker(event.latLng);
                console.log('pin1');
                console.log(event.latLng.toUrlValue(5));
            });
         

            function placeMarker(location) {
                var marker = new google.maps.Marker({
                    position: location,
                    draggable:true,
                    map: map
                });
              
                google.maps.event.addListener(marker, 'dragend', function(event){
                  console.log(marker.getPosition().lat());
                })
            }
         
         
         
            var finalData = [];
            var all_overlays = [];
            var selectedShape;
            var drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: google.maps.drawing.OverlayType.MARKER,
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [
                        //google.maps.drawing.OverlayType.MARKER,
                        google.maps.drawing.OverlayType.CIRCLE,
                        google.maps.drawing.OverlayType.POLYGON,
                        google.maps.drawing.OverlayType.RECTANGLE
                    ]
                },
                markerOptions: {
                    icon: 'images/beachflag.png'
                },
                circleOptions: {
                    fillColor: '#ffff00',
                    fillOpacity: 0.2,
                    strokeWeight: 3,
                    clickable: false,
                    editable: true,
                    zIndex: 1
                },
                polygonOptions: {
                    clickable: true,
                    draggable: true,
                    editable: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                },
                rectangleOptions: {
                    clickable: true,
                    draggable: true,
                    editable: true,
                    fillColor: '#ffff00',
                    fillOpacity: 0.5,
                }
            });

            function clearSelection() {
                if (selectedShape) {
                    selectedShape.setEditable(false);
                    selectedShape = null;
                }
            }

            function setSelection(shape) {
                clearSelection();
                selectedShape = shape;
                shape.setEditable(true);
                console.log('pin2');

                console.log(all_overlays);




                google.maps.event.addListener(selectedShape.getPath(), 'insert_at', getPolygonCoords(shape));

                //google.maps.event.addListener(selectedShape.getPath(), 'set_at', getPolygonCoords(shape));
            }

            function deleteSelectedShape() {
                if (selectedShape) {
                    selectedShape.setMap(null);
                }
            }

            function saveCoordinates() {
                console.log('pin6');

                console.log(finalData);
            }

            function deleteAllShape() {
                for (var i = 0; i < all_overlays.length; i++) {
                    all_overlays[i].overlay.setMap(null);
                }
                all_overlays = [];
            }

            function CenterControl(controlDiv, map) {

                // Set CSS for the control border.
                var controlUI = document.createElement('div');
                controlUI.style.backgroundColor = '#fff';
                controlUI.style.border = '2px solid #fff';
                controlUI.style.borderRadius = '3px';
                controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
                controlUI.style.cursor = 'pointer';
                controlUI.style.marginBottom = '22px';
                controlUI.style.textAlign = 'center';
                controlUI.title = 'Select to delete the shape';
                controlDiv.appendChild(controlUI);

                // Set CSS for the control interior.
                var controlText = document.createElement('div');
                controlText.style.color = 'rgb(25,25,25)';
                controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
                controlText.style.fontSize = '16px';
                controlText.style.lineHeight = '38px';
                controlText.style.paddingLeft = '5px';
                controlText.style.paddingRight = '5px';
                controlText.innerHTML = 'Delete Selected Area';
                controlUI.appendChild(controlText);

                // Setup the click event listeners: simply set the map to Chicago.
                controlUI.addEventListener('click', function() {
                    deleteSelectedShape();
                });

                // Create get coordinate btn

                // Set CSS for the control border.
                var controlUI2 = document.createElement('div');
                controlUI2.style.backgroundColor = '#fff';
                controlUI2.style.border = '2px solid #fff';
                controlUI2.style.borderRadius = '3px';
                controlUI2.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
                controlUI2.style.cursor = 'pointer';
                controlUI2.style.marginBottom = '22px';
                controlUI2.style.textAlign = 'center';
                controlUI2.title = 'Select to delete the shape';
                controlDiv.appendChild(controlUI2);


                // Set CSS for the control interior.
                var controlText2 = document.createElement('div');
                controlText2.style.color = 'rgb(25,25,25)';
                controlText2.style.fontFamily = 'Roboto,Arial,sans-serif';
                controlText2.style.fontSize = '16px';
                controlText2.style.lineHeight = '38px';
                controlText2.style.paddingLeft = '5px';
                controlText2.style.paddingRight = '5px';
                controlText2.innerHTML = 'Save';
                controlUI2.appendChild(controlText2);

                // Setup the click event listeners: simply set the map to Chicago.
                controlUI2.addEventListener('click', function() {
                    saveCoordinates();
                });


            }
            drawingManager.setMap(map);
            var getPolygonCoords = function(newShape) {
                console.log("We are one");
                var data = {};
                var selectedArea = prompt("Please enter name of the area");


                var latlan = [];
                var len = newShape.getPath().getLength();
                for (var i = 0; i < len; i++) {
                    console.log('pin3');

                    console.log(newShape.getPath().getAt(i).toUrlValue(18));
                    latlan.push(newShape.getPath().getAt(i).toUrlValue(18));
                }

                if (selectedArea) {
                    data['areaName'] = selectedArea;
                    data['latlan'] = latlan;
                }

                finalData.push(data);
            };

            google.maps.event.addListener(drawingManager, 'polygoncomplete', function(event) {

                event.getPath().getLength();
                google.maps.event.addListener(event.getPath(), 'insert_at', function() {
                    var len = event.getPath().getLength();
                    for (var i = 0; i < len; i++) {
                        console.log('pin4');

                        console.log(event.getPath().getAt(i).toUrlValue(5));
                    }
                });
                google.maps.event.addListener(event.getPath(), 'set_at', function() {
                    var len = event.getPath().getLength();
                    for (var i = 0; i < len; i++) {
                        console.log('pin5');

                        console.log(event.getPath().getAt(i).toUrlValue(5));
                    }
                });
            });

            google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {

                all_overlays.push(event);
                if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                    drawingManager.setDrawingMode(null);
                    //Write code to select the newly selected object.

                    var newShape = event.overlay;
                    newShape.type = event.type;
                    google.maps.event.addListener(newShape, 'click', function() {
                        setSelection(newShape);
                    });

                    setSelection(newShape);
                }
            });


            var centerControlDiv = document.createElement('div');
            var centerControl = new CenterControl(centerControlDiv, map);

            centerControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
        });
    }
};
