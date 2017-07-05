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

      scope.$watch('center', initMap);


      function initMap(center) {
        if(!center) return false;
        map = new google.maps.Map(element[0], {
          zoom: 8,
          center: center,
          scrollwheel: false
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
          marker = new google.maps.Marker({
            position: trail,
            map
          });
        }
      }

    }
  };
}
