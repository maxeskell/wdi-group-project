    /* global google */
angular
.module('wildside')
.directive('googleMap', googleMap);

function googleMap() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="map">GOOGLE MAP HERE</div>',
    scope: {
      center: '=',
      route: '='
    },
    link(scope, element) {

      let map = null;
      let marker = null;
      let poly = null;
      let markerTwo = null;
      let markerAll = null;


      scope.$watch('center', initMap);
      scope.$on('$destroy', destroyMap);
      function initMap(center) {
        if(!center) return false;
        map = new google.maps.Map(element[0], {
          zoom: 14,
          center: center,
          scrollwheel: false
        });


        const markers = scope.route;
        const otherMarker = markers.slice(1, markers.length -1);
        const firstMarker = markers[0];
        const lastMarker = markers[markers.length - 1];

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(firstMarker);
        bounds.extend(lastMarker);
        map.fitBounds(bounds);


        marker = new google.maps.Marker({
          position: firstMarker,
          map
        });
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
        markerTwo = new google.maps.Marker({
          position: lastMarker,
          map
        });
        markerTwo.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
        for(let i = 0; i < otherMarker.length; i++){
          markerAll = new google.maps.Marker({
            position: otherMarker[i],
            map
          });
          markerAll.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
        }


        poly = new google.maps.Polyline({
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map,
          path: scope.route


        });

      }





      function destroyMap() {
        console.log('bye map');
        marker.setMap(null);
        marker = null;
        map = null;
      }
    }
  };
}
