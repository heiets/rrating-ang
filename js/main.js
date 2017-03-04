'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
    var app = angular.module('Rrating', []);
    app.directive('app', function () {
        return {
            restrict: 'E',
            templateUrl: './containers/app.html',
            controller: function controller($scope, $http) {
                $scope.searchData = function (e) {
                    $scope.clearClass();
                    $scope.data = $scope.primalData.filter(function (v) {
                        return v.title.toLowerCase().indexOf(e.search) !== -1 || v.town.toLowerCase().indexOf(e.search) !== -1;
                    });
                };
                $scope.sortFilter = function (str, $event) {
                    var isUp = $($event.target).hasClass('sortedUp');
                    if (!isUp) {
                        $scope.data.sort(function (a, b) {
                            if (a[str] > b[str]) return 1;
                            if (a[str] < b[str]) return -1;
                        });
                        $scope.clearClass();
                        $($event.target).addClass('sortedUp');
                    }
                    if (isUp) {
                        $scope.data.sort(function (a, b) {
                            if (a[str] > b[str]) return -1;
                            if (a[str] < b[str]) return 1;
                        });
                        $scope.clearClass();
                        $($event.target).addClass('sortedDown');
                    }
                };
                $scope.showDesc = function (id, $event) {
                    $('#' + id).toggleClass('showDesc');
                    $($event.target.parentNode).toggleClass('active');
                };
                $scope.incLike = function (likes, id, $event) {
                    $event.stopPropagation();
                    if ($scope.data[id].canUp && $scope.data[id].canDown) {
                        $scope.data[id].likes++;
                        $scope.data[id].canUp = false;
                        $($event.target).parent().css({ color: 'green' });
                    }
                    if (!$scope.data[id].canDown) {
                        $scope.data[id].likes++;
                        $scope.data[id].canDown = true;
                        $($event.target).parent().css({ color: 'black' });
                    } else {
                        return false;
                    }
                };
                $scope.decLike = function (likes, id, $event) {
                    $event.stopPropagation();
                    if ($scope.data[id].canDown && $scope.data[id].canUp) {
                        $scope.data[id].likes--;
                        $scope.data[id].canDown = false;
                        $($event.target).parent().css({ color: 'red' });
                    }
                    if (!$scope.data[id].canUp) {
                        $scope.data[id].likes--;
                        $scope.data[id].canUp = true;
                        $($event.target).parent().css({ color: 'black' });
                    } else {
                        return false;
                    }
                };
                $scope.clearClass = function () {
                    $('.sortedUp').removeClass('sortedUp');
                    $('.sortedDown').removeClass('sortedDown');
                };
                $http({
                    method: 'GET',
                    url: './js/data/data.json'
                }).then(function (r) {
                    $scope.data = r.data.result;
                    $scope.primalData = [].concat(_toConsumableArray($scope.data));
                }, function (e) {
                    return console.log(e);
                });
            }
        };
    }).directive('desc', function () {
        return {
            restrict: 'E',
            templateUrl: './containers/desc.html'
        };
    });
})();