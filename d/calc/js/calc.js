$(function(){ 
	var data = {
		calc:[
		{calc:'Live time'},
		{calc:'BMI'},
		{calc:'Calc Years'}
		]
	}
	
	var calcModel = Backbone.Model.extend({
		defaults: {
			birthday: null,
			result: null,
			page: 0,
		},
	});

		
	var StartView = Backbone.View.extend({
		el: $('.doc'),
		events:{
			'click li': 'select'
		},
		select: function(e){
			this.undelegateEvents();
			switch(e.toElement.innerHTML){
				case 'Live time':
					this.model.set({'page': 1});
				break;
				default:
                  this.model.set({'page': 0});
			} 
		},
		initialize: function(){
			this.$el.html(Mustache.to_html($('#tmpl_start').html(), data));
		},
	});
	
	var liveTimView = Backbone.View.extend({
            initialize: function(){
                var resultJson = {};
                this.$el.html(Mustache.to_html($('#tmpl_livetime').html(), resultJson)); 
            },
            el: $('.doc'),
            events: {
                'click .back': 'backToStart',
                'click .calc':'onCalc'
            },
            backToStart: function(){
                this.undelegateEvents();
                this.model.set({'page': 0});
            },
            onCalc:function(e){
                document.getElementById('result').innerHTML = document.getElementById('birthday').value;
            }
        });
		
	var AppView = Backbone.View.extend({
            initialize: function(){
                this.model.on('change:page', function(model, page){
                    switch(page){
                        case 1:
                        new liveTimView({model: model});
                        break;
                        case 2:
                        new BMIView({model: model});
                        break;
                        default:
                        new StartView({model: model});
                    }
                });
                this.init();
            },
            init: function(){
                new StartView({model: this.model});
                this.scrollToTop();
            },
            scrollToTop: function(){
                setTimeout(function(){window.scrollTo(0, 1);}, 500);
            }  
        });
        
        new AppView({model: new calcModel});
}); 