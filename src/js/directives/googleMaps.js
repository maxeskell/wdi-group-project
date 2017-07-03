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
      path: '='
    },
    link(scope, element) {

      let map = null;
      let marker = null;

      scope.$watch('center', initMap);
      scope.$on('$destroy', destroyMap);
      function initMap(center) {
        if(!center) return false;
        map = new google.maps.Map(element[0], {
          zoom: 14,
          center: center
        });

        marker = new google.maps.Marker({
          position: center,
          map
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
