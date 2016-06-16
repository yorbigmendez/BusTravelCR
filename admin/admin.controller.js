angular.module('MapsApplication', []).controller("adminController", function ($scope, $http) {
    //name of terminal
    $scope.busTerminal = "";
    //Add terminal, going to be locationXY in parameter
    $scope.pointX = 0;
    $scope.pointY = 0;
    //Used to changeView
    $scope.changeView = function (view) {
        if (view == 'maps') {
            $location.path('../map/map.html');
        }
        if (view == 'home') {
            $location.path('../home/home.html');
        }
        if (view == 'about') {
            $location.path('../about/about.html');
        }
    };
    //Used to moveMap
    $scope.moveMap = function (direction) {
        if (direction == 'up') {
            console.log('On move up');
        }
        if (direction == 'down') {
            console.log('On move down');
        }
        if (direction == 'left') {
            console.log('On move left');
        }
        if (direction == 'right') {
            console.log('On move right');
        }
    };
    $scope.zoom = function (zoom) {
        if (zoom == 'in') {
            console.log('On Zoom In');
        }
        if (zoom == 'out') {
            console.log('On Zoom Out');
        }
    };

    function load() {
        //Get all terminals
        $http({
            method: 'GET'
            , url: '../php/terminal.php?action=get'
        }).
        then(
            function (response) {
                $scope.terminals = response;
                console.log($scope.terminals);

            }
            , function () {
                console.log("Error loading the terminals");
            });
    }
    load();
    //Database actions for admin views
    $scope.databaseAction = function (view, action) {
        if (view == "terminal" && action == "insert") { //Insert Terminal
            $http.post("../php/terminal.php?action=insert&name="+$scope.busTerminal).
                success(function(data, status){
                    $scope.hello = data;
                });
            load();//Reload table
            /* 
                //http://localhost:8080//BusTravelCR/php/newTerminal.php?action=insert&name=Prueba1&locationXY=asdf
            */
        }
    };

    //<<------------------------------------------------>>//
    $scope.distritos = new Object();
    $scope.nombresDistritos = [];
    $scope.selectedDistrict = "";

    //Dimensiones del visor
    $scope.canvasX = 680;
    $scope.canvasY = 600;

    //Minimos
    $scope.xmin = 0;
    $scope.ymin = 0;

    //Factor proporcional con respecto a las dimensiones
    $scope.factorProporcional = 0;

    //Zoom del visor
    $scope.zoom = 0;
    $scope.zoomType = 1;
                                                                                              
    //Obtiene los minimos, a partir de donde se va comenzar a dibujar
    $scope.getMins = function () {
        $scope.xmin = $scope.distritos.data.Dimensiones.xmin;
        $scope.ymin = $scope.distritos.data.Dimensiones.ymin;
    };

    //Consulta para obtener el objeto distritos
    $scope.obtenerDistritos = function ()
    {
        $http({method: 'GET', url: '../php/getDistritos.php'}).
                then(
                        function (response)
                        {
                            $scope.distritos = response;
                            console.log(response);
                            $scope.factorProporcional = ($scope.distritos.data.Dimensiones.ymax - $scope.distritos.data.Dimensiones.ymin) / $scope.canvasY;
                            $scope.getMins();
                            $scope.dibujaDistritos();
                        },
                        function ()
                        {
                            console.log("Error cargando los distritos");
                        });
    };
    //Dibuja los datos en el canvas
    $scope.dibujaDistritos = function ()
    {

        var canvas = document.getElementById('canvasDistritos');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        $scope.distritos.data.objs.forEach(function (value)
        {
            $scope.nombresDistritos.push(value.distrito);
            var size = value.coordenada.coordinates[0][0].length;
            for (i = 0; i < (size - 2); i++)
            {
                //Valor relacional de columnas
                var x = value.coordenada.coordinates[0][0][i][0];
                var y = value.coordenada.coordinates[0][0][i][1];
                //Factor proporcional de punto a donde se debe de dibujar
                x = Math.round((x - $scope.xmin ) / $scope.factorProporcional);
                y = Math.round((y - $scope.ymin) / $scope.factorProporcional);
                
                y = $scope.canvasY - y;
                
                //Factor X y Y donde se va dibujar
                if ($scope.zoomType === 1) {
                    x = x + (x * $scope.zoom);
                    y = y + (y * $scope.zoom);
                } else
                {
                    x = x - (x * $scope.zoom);
                    y = y - (y * $scope.zoom);
                }

                //Pregunta si es primer punto
                if (i === 0) {
                    context.beginPath();
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }

            }
            //Cierre path
            context.closePath();
            //Llene con estilo
            context.fillStyle = "rgb(240,221,123)";
            context.stroke();
            context.fill();
        });
    };
    $scope.obtenerDistritos();
});
