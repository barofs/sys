(function() {
  'use strict'
  angular.module('myApp').component('valueBox', {
      bindings: {
        grid: '@',
        colorClass: '@',
        value: '@',
        text: '@',
        iconClass: '@',
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
        <div class="small-box {{ $ctrl.colorClass }}">
          <div class="inner">
            <h3>{{ $ctrl.value }}</h3>
            <p>{{ $ctrl.text }}</p>
          </div>
          <div class="icon">
            <i class="{{ $ctrl.iconClass }}"></i>
          </div>
              <a href="#" class="small-box-footer">Mais Informações <i class="fa fa-arrow-circle-right"></i></a>
        </div>
      </div>
      `
    });
})()
