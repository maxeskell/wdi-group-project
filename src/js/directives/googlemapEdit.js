/* global google */

angular
.module('wildside')
.directive('googleMapEdit', googleMapEdit);

function googleMapEdit() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="map">GOOGLE MAP HERE</div>',
    scope: {
      center: '=',
      route: '=',
      oldRoute: '='
    },
    link(scope, element) {

      let map = null;
      let markers = [];
      let poly = null;
      let oldPoly = null;

      scope.$watch('oldRoute', initMap, true);
      scope.$on('$destroy', destroyMap);

      function initMap(oldRoute) {
        if (!oldRoute) return false;
        map = new google.maps.Map(element[0], {
          zoom: 14,
          center: oldRoute[0],
          // center: oldRoute[0],
          scrollwheel: false
        });


        oldPoly = new google.maps.Polyline({
          path: oldRoute,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        oldPoly.setMap(map);

        const markers = scope.oldRoute;


        const bounds = new google.maps.LatLngBounds();
        markers.forEach((marker) => {
          bounds.extend(marker);
        });
        map.fitBounds(bounds);


        const array = [];

        poly = new google.maps.Polyline({
          strokeColor: '#39FD26',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        poly.setMap(map);

        map.addListener('click', (e) => {
          const position = (e.latLng.toJSON());
          array.push(position);
          poly.setPath(array);


          scope.route.push(position);
          scope.$apply();

          new google.maps.Marker({
            position,
            map
          });

        });
      }


      function destroyMap() {
        console.log('bye Edit map');
        markers.forEach(marker => marker.setMap(null));
        markers = [];
        map = null;
      }

    }
  };
}
