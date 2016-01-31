angular.module('app.dialog')
    .controller('dialogController', function($scope) {
        var self = this;
        self.salesmenQuantity = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        self.typeOfProduct = ["Drinks","Fabrics","Cosmetics","Electronics","Other"]
    });

