app.controller("adminController",function($scope, $http){
    $scope.busTerminal = "";
    $scope.addTerminal = function(){
        $scope.busTerminal = "THis has been updated by click";
    };
    $scope.changeView = function(view){
        if(view == 'maps'){
            $location.path('../map/map.html');   
        }
        if(view == 'home'){
            $location.path('../home/home.html');   
        }
        if(view == 'about'){
            $location.path('../about/about.html');   
        }
    };
    $scope.moveMap = function (direction){
        if(direction == 'up'){
            console.log('On move up');
        } if(direction == 'down'){
            console.log('On move down');
        } if(direction == 'left'){
            console.log('On move left');
        } if(direction == 'right'){
            console.log('On move right');
        }  
    };
});