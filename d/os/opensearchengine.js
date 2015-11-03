$('#submit').click(function(){
	openSearch();
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
        openSearch();
		return false;
	}
 });       

function openSearch(){
	var name = $('#name').val();
	if(name === ''){
		return false;
	}
	var urlMap = [{id:'google',url:'https://www.google.com.hk/?gws_rd=cr,ssl#newwindow=1&safe=strict&q='},
	              {id:'baidu',url:'http://baidu.com/s?wd='},
				  {id:'bing',url:'http://cn.bing.com/search?q='},
				  {id:'yahoo',url:'https://search.yahoo.com/search;_ylt=AwrBT.O7dzhWhPoACV9XNyoA?p='},
				  {id:'soso',url:'http://www.sogou.com/web?query='},
				  {id:'360',url:'http://www.haosou.com/s?q='},
				  {id:'youdao',url:'http://www.youdao.com/search?q='}];
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
	
