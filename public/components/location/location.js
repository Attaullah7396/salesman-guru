angular.module('app.location', [])
    .controller('locationController', function($scope,$stateParams) {
        var  _self = this;
        console.log($stateParams.lat);
        console.log($stateParams.lng);

        var lat = $stateParams.lat * 1;
        var lng = $stateParams.lng * 1;
        angular.extend($scope, {
            center: {
                lat: lat,
                lng: lng,
                zoom: 5
            },
            markers :{
                center  : {
                    lat: lat,
                    lng: lng,
                    message: "Order received from here!",
                    focus: true,
                    draggable: false
                }
            }
        });

});

