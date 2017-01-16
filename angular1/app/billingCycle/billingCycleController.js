(function() {
  angular.module('myApp').controller('BillingCycleCtrl', [
    '$http',
    'msgs',
    'tabs',
    BillingCycleController
  ])
  function BillingCycleController($http, msgs, tabs) {
    const self = this
    const url = 'http://localhost:3003/api/billingCycles'

    self.refresh = function() {
      $http.get(url).then(function successCallback(response)  {
        self.billingCycle = {}
        self.billingCycles = response.data
        tabs.show(self, { tabList: true, tabCreate: true})
      }, function errorCallback(data) {
         self.resp = data.data
         msgs.addError(self.resp.errors)
      });
    }

    self.create = function () {
      self.refresh()
      $http.post(url, self.billingCycle).then(function successCallback(response)  {
        self.billingCycle = {}
        msgs.addSuccess('Operação realizada com sucesso!')
      }, function errorCallback(data) {
         self.resp = data.data
         msgs.addError(self.resp.errors)
      });
    }
    self.refresh()
  }
})()
