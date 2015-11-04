"use strict";

(function(){
$(document).ready(function(){ 
var urlMap = [{id:'google',url:'https://www.google.com.hk/?gws_rd=cr,ssl#newwindow=1&safe=strict&q='},
	              {id:'baidu',url:'http://baidu.com/s?wd='},
				  {id:'bing',url:'http://cn.bing.com/search?q='},
				  {id:'yahoo',url:'https://search.yahoo.com/search;_ylt=AwrBT.O7dzhWhPoACV9XNyoA?p='},
				  {id:'soso',url:'http://www.sogou.com/web?query='},
				  {id:'360',url:'http://www.haosou.com/s?q='},
				  {id:'youdao',url:'http://www.youdao.com/search?q='}];
var tags = [];
function getName(){
	return $('#name').val();
}
$('#submit').click(function(){
	openSearch(getName());
	addTag(getName());
});
$('#checkAll').click(function(){
	if($(this).is(":checked")){
		$.each($('[type=checkbox]'),function(index,value){
			value.checked = true;
		})
	}else{
		$.each($('[type=checkbox]'),function(index,value){
			value.checked = false;
		})
	}
});

$('#name').focus(function(){
	this.value=''
});


 $('#name').bind('keypress',function(event){
    if(event.keyCode == "13")    
    {
        openSearch(getName());
		addTag(getName());
		return false;
	}
 });       

function openSearch(name){
	if(name === ''){
		return false;
	}
	for (var index = 0; index < $('[type=checkbox]').length-1; index++) {
		if($('#'+$('[type=checkbox]')[index].id).is(":checked")){
			var id = $('[type=checkbox]')[index].id;
			$.each(urlMap,function(index,value){
				if(value.id===id){
					window.open(value.url + name);
				}
		    })
	    }
	}
}
function addTag(name){
	tags.push(name);
	var html = generateTag(name);
	$('#tags').append(html);
	$('button').bind("click", function(){ 
		openSearch(this.textContent); 
	});  
	
}
function generateTag(tag){
	return '<button class="btn btn-info btn-margin" attribute="tag">'+tag+'</button>';
}
});
})();

	
