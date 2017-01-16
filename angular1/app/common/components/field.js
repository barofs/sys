(function() {
  'use strict'
  angular.module('myApp').component('field', {
    bindings: {
      id: '@',
      label: '@',
      grid: '@',
      placeholder: '@',
      type: '@',
      model: '=',
      readonly: '<',
    },
    controller: [
      'gridSystem',
      function(gridSystem) {
        let self = this;
        this.$onInit = function() {
          self.gridClasses = gridSystem.toCssClasses(self.grid);
        };
      }
    ],
    template: `
      <div class="{{ $ctrl.gridClasses }}">
        <div class="form-group">
          <label for="{{ $ctrl.id }}">{{ $ctrl.label }}:</label>
          <input type="{{ $ctrl.type }}" ng-model="$ctrl.model" id="{{ $ctrl.id }}" class="form-control" placeholder="{{ $ctrl.placeholder }}" ng=readonly="$ctrl.readonl">
        </div>
      </div>
    `
  })
})()
