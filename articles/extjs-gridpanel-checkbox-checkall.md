The tips of how to set checkbox value in header of gridPanel
### Introduction
In the grid panel, its has two columns, one is checkbox column and another one is something like name column. There is a 
requirement which need checked all rows when grid does load end data, but in the gridPanel cannot be checked checkbox in header.
It's very weird issue, I cannot find a solution from API documents, through debugging source code, I found that there is
an event called onHdMouseDown, when click checkbox in header it could be select all rows, and it just add css on that cell,
the implements code like this 
````javascript
onHdMouseDown :function(e, t){
    if(t.className =='x-grid3-hd-checker'){
    	e.stopEvent();var hd =Ext.fly(t.parentNode);
		var isChecked = hd.hasClass('x-grid3-hd-checker-on');
		if(isChecked){                
		    hd.removeClass('x-grid3-hd-checker-on');
			this.clearSelections();
	    }else{ 
     		hd.addClass('x-grid3-hd-checker-on');
			this.selectAll();
		}
	}
}
````
So I could be use the same way to solve my issue, at the end I found a solution on stackoverflow, the background method 
as below code

````javascript
var sm = new Ext.grid.CheckboxSelectionModel({
    listeners : {
            selectionchange : function(){
                var recLen = Ext.getCmp('grid').store.getRange().length;
                var selectedLen = this.selections.items.length;
                var view   = Ext.getCmp('grid').getView();
                var chkdiv = Ext.fly(view.innerHd).child(".x-grid3-hd-checker")
                if(selectedLen == recLen){
                    chkdiv.addClass("x-grid3-hd-checker-on");
                } else {
                    chkdiv.removeClass("x-grid3-hd-checker-on");
                }
            }
            ,rowdeselect : function ( sm ,rowIndex ,record) {
                var view   = Ext.getCmp('grid').getView();
                var chkdiv = Ext.fly(view.innerHd).child(".x-grid3-hd-checker")
                chkdiv.removeClass('x-grid3-hd-checker-on');
            }
    }
 });
````

It could be solve my issue perfectly. 
the reference link is http://stackoverflow.com/questions/7969607/extjs-checkboxselection-header-not-updating