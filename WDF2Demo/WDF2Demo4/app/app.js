var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: 'CustomerController',
            templateUrl: 'views/customer.html'
        })
        .when('/add',
        {
            controller: 'AddController',
            templateUrl: 'views/AddUpdateCustomer.html'
        })
         .when('/update/:id',
        {
            controller: 'UpdateController',
            templateUrl: function (id) {
                return 'views/AddUpdateCustomer.html'
            }
        })
        .otherwise({ redirectTo: '/' })
});


app.service('customerService', function ($http, $q) {

    var controllerUrl = 'http://wdf2demo.leanconsulting.ph/api/Customers';
    //var controllerUrl = 'http://localhost:55077/api/Customers';
    return {
        getAll: function (status) {
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
        add: function (entity) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: controllerUrl + '/Add',
                data: entity
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        update: function (id, entity) {
            var deferred = $q.defer();
            $http({
                method: 'PUT',
                url: controllerUrl + '/' + id,
                data: entity
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(data);
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
                deferred.reject(data);
            });
            return deferred.promise;
        },
    }
});


app.controller('CustomerController', function ($scope, customerService) {
    $scope.customers = [];

    var getCustomers = function () {
        customerService.getAll().then(function (data) {
            $scope.customers = data;
        }, function (error) {
            console.log(error);
        });
    };


    $scope.deleteCustomer = function (entity) {
        customerService.remove(entity.customerID).then(function () {
            alert('Successfully deleted!');
            getCustomers();
        });
    }

    getCustomers();
});


app.controller('AddController', function ($scope, customerService, $location) {
    $scope.form = {};

    $scope.save = function () {
        customerService.add($scope.form).then(function () {
            alert('Added!');
            $location.path('/');
        }, function (error) {
            console.log(error);
        });
    }
});


app.controller('UpdateController', function ($scope, customerService, $routeParams, $location) {
    $scope.form = {};
    var isNew = true;

    $scope.save = function () {
        customerService.update($routeParams.id, $scope.form).then(function () {
            alert('Update!');
            $location.path('/');
        }, function (error) {
            console.log(error);
        });
    }

    var getCustomer = function (id) {
        customerService.find(id).then(function (data) {
            $scope.form = data;
        });
    }

    var init = function () {
        if (typeof $routeParams.id !== 'undefined') {
            getCustomer($routeParams.id);
        } else {
            alert('NO ID FOUND.');
        }
    }

    init();

});