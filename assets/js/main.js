$(window).scroll(function(){
　　var scrollTop = $(this).scrollTop();
    if($('.topBread')[0].childNodes.length===1){
		var colors = ['#0000ff','#8a2be2','#a52a2a','#2a3440','#6b8e23','#00008b','#006400','#daa520','#9932cc','#1e90ff','#ff6347','#87ceeb','#ff69b4','#fa8072']
		var html = '';
		colors.forEach(function(element) {
			html += "<a href='/'><div style='background: "+element+";width: 6.6%;height: 10px;float: left;'></div></a>";
		}, this);
		$('.topBread').html(html);
	}
　　if(scrollTop > 150 ){
　　　　 $('#header').hide();
	    $('.topBread').show();
　　}else{
	    $('#header').show();
		$('.topBread').hide();
    }
});