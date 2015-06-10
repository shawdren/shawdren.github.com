var app = angular.module('laiShuaTiApp', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures'
]);
app.run(function($transform) {
  window.$transform = $transform;
});
app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: '../../d/s/views/home.html', reloadOnSearch: false});
  $routeProvider.when('/list/:type',    {templateUrl: '../../../d/s/views/scroll.html', reloadOnSearch: false, controller: 'ListController as listCtrl'}); 
  $routeProvider.when('/test/:id',      {templateUrl: '../../../d/s/views/test.html', reloadOnSearch: false, controller: 'TestController as testCtrl'}); 
  $routeProvider.when('/result',      {templateUrl: '../../../d/s/views/result.html', reloadOnSearch: false, controller: 'ResultController as resultCtrl'}); 
});