(function() {
  'use strict';
  angular.module('myApp').component('contentHeader', {
     bindings: {
        name: '@',
        small: '@',
        link: '@',
     },
     template: `
        <section class="content-header">
          <h1>{{ $ctrl.name }} <small>{{ $ctrl.small }}</small></h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">{{$ctrl.link}}</li>
          </ol>
        </section>
     `
  });
})()
