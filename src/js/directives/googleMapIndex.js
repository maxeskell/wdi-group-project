/* global google */
angular
.module('wildside')
.directive('googleMapIndex', googleMapIndex);

function googleMapIndex() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="map">GOOGLE MAP HERE</div>',
    scope: {
      center: '=',
      trails: '='
    },
    link(scope, element) {

      let map = null;
      let infowindow = null;
      let markers = [];

      scope.$watch('center', initMap);
      scope.$on('$destroy', destroyMap);

      function initMap(center) {
        if(!center) return false;
        map = new google.maps.Map(element[0], {
          zoom: 7,
          center: center,
          scrollwheel: false,
          styles: mapStyles
        });
        scope.$watch('trails', addMarkers, true);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };


            map.setCenter(pos);
          });
        }

        function addMarkers(trails) {
          trails.forEach((trail) => {
            addMarker(trail);
          });
        }


        function addMarker(trail){
          const marker = new google.maps.Marker({
            position: trail.route[0],
            map
          });


          marker.addListener('click', () => {
            if(infowindow) infowindow.close();
            console.log(trail.id);

            infowindow = new google.maps.InfoWindow({
              content: `
                <h1><a href="/trails/${trail.id}">${trail.trailName}</a></h1>
                <p>Length: ~${trail.length} (Km)</p>
                <p>Time: ~${trail.time} (hh:mm)</p>
                <p>Difficulty: ~${trail.difficulty}</p>
              `
            });

            infowindow.open(map, marker);
          });

          markers.push(marker);

        }
      }

      function destroyMap() {
        console.log('bye Index map');
        markers.forEach(marker => marker.setMap(null));
        markers = [];
        map = null;
      }


    }
  };
}
