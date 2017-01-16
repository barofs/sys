(function() {
  'use strict';
  angular.module('myApp').controller('DashboardCtrl', [
    '$http',
    DashboardController
  ])
  function DashboardController($http) {
    const self = this
    self.getSummary = function() {
      const url = 'http://localhost:3003/api/billingSummary';
      // Simple GET request example:
      $http({method: 'GET', url: url}).then(function successCallback(status)  {
        self.resposta = status.data
      }, function errorCallback(status) {
          console.log(status);
      });
    }
    self.getSummary()
  }
})()
