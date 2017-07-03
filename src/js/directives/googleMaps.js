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

      scope.$watch('center', initMap);
      scope.$on('$destroy', destroyMap);
      function initMap(center) {
        if(!center) return false;
        map = new google.maps.Map(element[0], {
          zoom: 12,
          center: center
        });

        marker = new google.maps.Marker({
          position: center,
          map
        });

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
