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
			testTime: 10,
			picIndex: 0,
			shadowIndex: 0,
			page: 0,
			canvasData: '',
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
            },
            backToStart: function(){
                this.undelegateEvents();
                this.model.set({'page': 0});
            },
            setTime: function(time){
                var m = Math.floor(time/(60*1000)), s = Math.floor((time-m*60*1000)/1000);
                this.$el.find('.time-prac').html(m+'分'+s+'秒');
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