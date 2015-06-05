app.controller('MainController', function($rootScope, $scope, $routeParams){

  console.log($routeParams);
    // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });
});

app.controller('ListController', function($rootScope, $scope, $routeParams){
  var self = this;
  // 
  // 'Scroll' screen
  // 
  var scrollItems = [ 
      {id: 1, question: 'what is item do you like most?', answer: [{a:'dfsdf fdfd', b:'dfd fdf erer'}]},
      {id: 2, question: 'what is item do you?', answer: [{a:'dfsdf fdfd', b:'dfd fdf erer'}]},
  ];
  
  if($routeParams.type === '1'){
    self.titleContent = '综合题';
  }
  if($routeParams.type === '2'){
    self.titleContent = '英语题';
  }
  if($routeParams.type === '3'){
    self.titleContent = '历史题';
  }
  self.scrollItems = scrollItems;
  $scope.scrollItems = scrollItems;
    // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });
});

app.controller('TestController', function($rootScope, $scope, $routeParams){
  var self = this;
  self.titleContent = '请选择一个答案';  
  var scrollItems = [ 
      {id: 1, question: 'what is item do you like most?', answer: ['dfsdf fdfd', 'dfd fdf erer']},
      {id: 2, question: 'what is item do you?', answer: ['dfsdf fdfd', 'dfd fdf erer']},
  ];
  
  angular.forEach(scrollItems, function(value, key) {
      if(value.id == $routeParams.id){
	     self.testItem = value;
		 return;
	  }
  });
  
  self.chooseAnwser = function(){
      
  };
  console.log($routeParams.id);
    // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });
});