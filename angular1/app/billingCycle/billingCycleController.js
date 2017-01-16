(function() {
  angular.module('myApp').controller('BillingCycleCtrl', [
    '$http',
    '$location',
    'msgs',
    'tabs',
    BillingCycleController
  ])
  function BillingCycleController($http, $location, msgs, tabs) {
    const self = this
    const url = 'http://localhost:3003/api/billingCycles'

    self.refresh = function() {
      const page = parseInt($location.search().page) || 1
      $http.get(`${url}?skip=${(page - 1) * 6}&limit=6`).then(function(response)  {
        self.billingCycle = {credits: [{}], debts: [{}]}
        self.billingCycles = response.data
        self.calculateValues()

        $http.get(`${url}/count`).then(function(response) {
          self.pages = Math.ceil(response.data.value / 6)
          tabs.show(self, { tabList: true, tabCreate: true})
        })
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

    self.showTabUpadate = function(billingCycle) {
      self.billingCycle = billingCycle
      self.calculateValues()
      tabs.show(self, { tabUpdate: true })
    }

    self.showTabDelete = function(billingCycle) {
      self.billingCycle = billingCycle
      self.calculateValues()
      tabs.show(self, { tabDelete: true })
    }

    self.delete = function() {
      const deleteUrl = `${url}/${self.billingCycle._id}`
      $http.delete(deleteUrl, self.billingCycle).then(function(response) {
        self.refresh()
        msgs.addSuccess('Operação realizada com sucesso!')
      }).error(function(data) {
        self.resp = data.data
        msgs.addError(self.resp.errors)
      })
    }

    self.addCredit = function(index) {
      self.billingCycle.credits.splice(index + 1, 0, {})
    }

    self.cloneCredit = function(index, {name, value}) {
      self.billingCycle.credits.splice(index + 1, 0, {name, value})
      self.calculateValues()
    }

    self.deleteCredit = function(index) {
      if(self.billingCycle.credits.length > 1) {
         self.billingCycle.credits.splice(index, 1)
         self.calculateValues()
      }
    }

    self.addDebt = function(index) {
       self.billingCycle.debts.splice(index + 1, 0, {})
     }

     self.cloneDebt = function(index, {name, value, status}) {
       self.billingCycle.debts.splice(index + 1, 0, {name, value, status})
       self.calculateValues()
     }

     self.deleteDebt = function(index) {
       if(self.billingCycle.debts.length > 1) {
         self.billingCycle.debts.splice(index, 1)
         self.calculateValues()
       }
     }

     self.cancel = function() {
       tabs.show(self, {tabList: true, tabCreate: true})
       self.billingCycle = {}
       initCreditsAndDebts()
     }

    self.calculateValues = function() {
      self.credit = 0
      self.debt = 0
      if(self.billingCycle) {
        self.billingCycle.credits.forEach(function({value}){
          self.credit += !value || isNaN(value) ? 0 : parseFloat(value)
        })
        self.billingCycle.debts.forEach(function({value}) {
          self.debt += !value || isNaN(value) ? 0 : parseFloat(value)
        })
      }
      self.total = self.credit - self.debt
    }
    self.refresh()
  }
})()
