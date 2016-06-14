app.controller("adminController",function($scope, $http){
    $scope.showDialog = false;
    $scope.busTerminal = "";
    $scope.addTerminal = function(){
        $scope.busTerminal = "THis has been updated by click";
    };
    $scope.insertRoute = function(){
        console.log('Hola Yorbi');
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
    $scope.zoom = function(zoom){
         if(zoom == 'in'){
            console.log('On Zoom In');
        } if(zoom == 'out'){
            console.log('On Zoom Out');
        }
    };
    $scope.select = {
            value: "Option1",
            choices: ["Option1", "I'm an option", "This is materialize", "No, this is Patrick."]
        };
    $scope.showDialog = function(){
        console.log("Going to change attribute");
          $scope.showDialog = true;
    };
});

app.run(function ($rootScope){
    angular.element(document).on("click",function(e){
        $rootScope.$broadcast("documentClicked",angular.element(e.target));
    });
});
