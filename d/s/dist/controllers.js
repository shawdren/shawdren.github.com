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
  var scrollItems = Categories;
  
  if($routeParams.type === '1'){
    self.titleContent = '刷题';
  }
  if($routeParams.type === '2'){
    self.titleContent = '出题';
  }
  if($routeParams.type === '3'){
    self.titleContent = '设置';
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

app.controller('TestController', function($rootScope, $scope, $routeParams, $location, dataService){
  var self = this;
  self.titleContent = '请选择一个答案';  
  var scrollItems = Questions;
  self.index = 0;
  self.result = 0;
  self.chooseAnwser = function(x,y,z){
      if(x == y.right){
          self.result++;
      }
      if(self.index === scrollItems.length-1){
          //window.alert('正确回答'+self.result+'题');
		  var score = {};
		  score.reuslt = self.result;
		  dataService.dataObj = score;
		  $location.path('result');
      }
      self.index++;
      self.testItem = scrollItems[self.index];
   };
   self.testItem = scrollItems[self.index]
    // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });
});


app.controller('ResultController', function($rootScope, $scope, $routeParams, $location, dataService){
    var self = this;
    self.result = dataService.dataObj.reuslt;
    console.log(dataService.dataObj);
	self.continuePlay = function(){
	    $location.path('/test/1/');
	};
    // Needed for the loading screen
    $rootScope.$on('$routeChangeStart', function(){
        $rootScope.loading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function(){
        $rootScope.loading = false;
    });
});