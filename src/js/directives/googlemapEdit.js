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
      let marker = null;
      let poly = null;
      let oldPoly = null;

      scope.$watch('oldRoute', initMap, true);

      function initMap(oldRoute) {
        if (!oldRoute) return false;
        map = new google.maps.Map(element[0], {
          zoom: 14,
          center: oldRoute[0],
          scrollwheel: false
        });
        console.log('Scope oldRoute:', oldRoute);

        oldPoly = new google.maps.Polyline({
          path: oldRoute,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        oldPoly.setMap(map);

        const markers = scope.oldRoute;
        const otherMarker = markers.slice(1, markers.length - 1);
        const firstMarker = markers[0];
        const lastMarker = markers[markers.length - 1];

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(firstMarker);
        bounds.extend(lastMarker);
        bounds.extend(otherMarker[1]);
        bounds.extend(otherMarker[0]);
        bounds.extend(otherMarker[2]);
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


    }
  };
}
