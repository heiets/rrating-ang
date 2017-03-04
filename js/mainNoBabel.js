(function () {
    let app = angular.module('Rrating', []);
    app.directive('app', function() {
        return {
            restrict: 'E',
            templateUrl: './containers/app.html',
            controller: function($scope, $http) {
                $scope.searchData = function(e) {
                    $scope.clearClass();
                    $scope.data = $scope.primalData.filter(v => (v.title.toLowerCase().indexOf(e.search) !== -1 || v.town.toLowerCase().indexOf(e.search) !== -1));
                };
                $scope.sortFilter = function(str, $event) {
                    let isUp = $($event.target).hasClass('sortedUp');
                    if (!isUp) {
                        $scope.data.sort( function(a,b) {
                            if (a[str] > b[str]) return 1;
                            if (a[str] < b[str]) return -1;
                        });
                        $scope.clearClass();
                        $($event.target).addClass('sortedUp');
                    }
                    if (isUp) {
                        $scope.data.sort( function(a,b) {
                            if (a[str] > b[str]) return -1;
                            if (a[str] < b[str]) return 1;
                        });
                        $scope.clearClass();
                        $($event.target).addClass('sortedDown');
                    }
                };
                $scope.showDesc = function(id, $event) {
                    $(`#${id}`).toggleClass('showDesc');
                    $($event.target.parentNode).toggleClass('active');
                };
                $scope.incLike = function(likes, id, $event) {
                    $event.stopPropagation();
                    if ($scope.data[id].canUp && $scope.data[id].canDown) {
                        $scope.data[id].likes++;
                        $scope.data[id].canUp = false;
                        $($event.target).parent().css({color: 'green'});
                    }
                    if (!$scope.data[id].canDown) {
                        $scope.data[id].likes++;
                        $scope.data[id].canDown = true;
                        $($event.target).parent().css({color: 'black'});
                    }
                    else {
                         return false;
                    }
                };
                $scope.decLike = function(likes, id, $event) {
                    $event.stopPropagation();
                    if ($scope.data[id].canDown && $scope.data[id].canUp) {
                        $scope.data[id].likes--;
                        $scope.data[id].canDown = false;
                        $($event.target).parent().css({color: 'red'});
                    }
                    if (!$scope.data[id].canUp) {
                        $scope.data[id].likes--;
                        $scope.data[id].canUp = true;
                        $($event.target).parent().css({color: 'black'});
                    }
                    else {
                        return false;
                    }
                };
                $scope.clearClass = function() {
                    $('.sortedUp').removeClass('sortedUp');
                    $('.sortedDown').removeClass('sortedDown');
                };
                $http({
                    method : 'GET',
                    url : './js/data/data.json'
                }).then(function(r) {
                    $scope.data = r.data.result;
                    $scope.primalData = [...$scope.data];
                }, e => console.log(e))
            }
        }
    }).directive('desc', function() {
        return {
            restrict: 'E',
            templateUrl: './containers/desc.html'
        }
    });

}());