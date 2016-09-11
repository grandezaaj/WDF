var app = angular.module('demoApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'CustomerController',
        templateUrl: 'customerTable.html'
    })
    .when('/add', {
        controller: 'AddCustomerController',
        templateUrl: 'add.html'
    })
    .when('/update/:customerID', {
        controller: 'UpdateCustomerController',
        templateUrl: 'update.html'
    })
});

app.controller('CustomerController', function ($scope, CustomerService) {

    var getCustomers = function () {
        CustomerService.getAll().then(function (success) {
            $scope.customers = success;
        }, function (error) {
            console.log(error);
        });
    }

    $scope.delete = function (id) {
        CustomerService.remove(id).then(function () {
            alert('DELETED!');
            getCustomers();
        });
    }

    getCustomers();
});

app.controller('AddCustomerController', function ($scope, CustomerService, $location) {
    $scope.save = function () {
        CustomerService.add($scope.form).then(function () {
            alert('ADDED!');
            $location.path('/');
        }, function (error) {
            console.log(error);
        });
    }
});

app.controller('UpdateCustomerController', function ($scope, CustomerService, $location, $routeParams) {
    $scope.update = function () {
        CustomerService.update($routeParams.customerID, $scope.form).then(function () {
            alert('UPDATED!');
            $location.path('/');
        }, function (error) {
            console.log(error);
        });
    }

    var init = function () {
        if (typeof $routeParams.customerID !== 'undefined') {
            CustomerService.find($routeParams.customerID).then(function (data) {
                $scope.form = data;
            }, function (error) {
                alert('Cannot find customer ID: ' + $routeParams.customerID);
            });
        }
    }

    init();
});

app.service('CustomerService', function ($http, $q) {
    //var controllerUrl = 'http://wdf2demo.leanconsulting.ph/api/Customers';
    var controllerUrl = 'http://localhost:55077/api/Customers';
    return {
        getAll: function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: controllerUrl
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        },
        add: function (entity) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: controllerUrl,
                data: entity
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        },
        update: function (id, entity) {
            var deferred = $q.defer();
            $http({
                method: 'PUT',
                url: controllerUrl + '/'+ id,
                data: entity
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        },
        find: function (id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: controllerUrl + '/' + id
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        },
        remove: function (id) {
            var deferred = $q.defer();
            $http({
                method: 'DELETE',
                url: controllerUrl + '/' + id
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }
    }

});

