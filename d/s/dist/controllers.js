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
      {id: 1, question: '综合题', answer: [{a:'dfsdf fdfd', b:'dfd fdf erer'}]},
      {id: 2, question: '综合知识', answer: [{a:'dfsdf fdfd', b:'dfd fdf erer'}]},
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
      {id: 1, question: '“铁观音”茶的原产发源地在中国的哪个省份？', answer: ['福建', '安徽'],right:'福建'},
      {id: 2, question: '奢侈品牌 LV 路易威登是哪个国家的品牌？', answer: ['法国', '英国'],right:'福建'},
      {id: 3, question: '欧洲的哪个城市被世界公认为“雾都”', answer: ['伦敦', '巴黎'],right:'伦敦'},
      {id: 4, question: '西藏布达拉宫最初是松赞干布为了迎接谁而兴建的？', answer: ['文成公主', '铁扇公主'],right:'文成公主'},
      {id: 5, question: '电影《碟中谍 4》中汤姆布鲁斯挑战的世界第一高的摩天大楼位于哪个城市？', answer: ['迪拜', '英国'],right:'迪拜'},
      {id: 6, question: '电影《变形金刚》中，与擎天柱作对的反派首领叫什么？', answer: ['威震天', '大黄蜂'],right:'威震天'},
      {id: 7, question: '金庸小说《射雕英雄传》中第一次华山论剑的胜利者是哪一位？', answer: ['王重阳', '郭靖'],right:'王重阳'},
      {id: 8, question: '法国巴黎有名的凯旋门是为了纪念哪位名人建造的？', answer: ['拿破仑', '希特勒'],right:'拿破仑'},
      {id: 9, question: '世界上出现麦田怪圈最多的国家是', answer: ['法国', '英国'],right:'福建'},
      {id: 10, question: '意大利有一座被活火山活埋的城市，叫什么？', answer: ['庞贝', '圣彼得堡'],right:'庞贝'},
  ];
  self.index = 0;
  self.result = 0;
  self.chooseAnwser = function(x,y,z){
      console.log(x);
      console.log(y);
      console.log(z);
      if(x == y.right){
          self.result++;
      }
      if(self.index === scrollItems.length){

      }
      self.index++;
      self.testItem = scrollItems[self.index];
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


app.controller('ResultController', function($rootScope, $scope, $routeParams){
    var self = this;

    self.result = {total: 8}
    console.log($routeParams);
    // Needed for the loading screen
    $rootScope.$on('$routeChangeStart', function(){
        $rootScope.loading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function(){
        $rootScope.loading = false;
    });
});