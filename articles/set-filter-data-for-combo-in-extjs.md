### Backgournd

Here is a common function that in the maintenance from which has a comboBox field and a data grid, once add a new record and pick up a value from
comboBox to the grid, then the data of comboBox should be changed that the selected one should be removed out from comboBox.

### What's issue

if I would be use the filter by function of comboBox in extjs, that could be only filter data for initial time, once I try to add some new records, 
the filter by function didn't work, because it's load data from cache data. 
````javascript
var comboStore = new Ext.data.ArrayStore({
	fields: ['value'],
	data : filterValidateFiled()
});

comboStore.filterBy(function(record){
	console.log(record.get('value'));
	var isTrue= true;
	if(record.get('value') === d.fieldName || record.data.value === d.subFieldName){
		isTrue = false;
	}
	return isTrue;
}, this);
````							   
I was use another way to filter data, that was maintain a data source on the form, if the comboBox items did changed, then reload the comboBox again, 
It has encounter issue which the data structure is complex, that is not easy to do filter data.

````javascript
//the filed name and sub filed name are all from one comboBox
var gridStore = new Ext.data.ArrayStore({
	data:[],
	fields: [
	   { name: 'fieldName', mapping: 'fieldName' },
	   { name: 'subFieldName', mapping: 'subFieldName' }
	]
});  
````
At last I did use recursive way to filter data, once do add, edit or delete operation.

````javascript
function deleteDuplicationItems(filterData){
	 Ext.each(filterData, function(d){
	 var index = arguments[1];
	 Ext.each(data, function(item){ 
			  if(d && (d[0] === item.fieldName || d[0] === item.subFieldName)){
				  filterData.splice(index,1);
				  deleteDuplicateItems(filterData);
			  } 
		 }, d);
	  });
	return filterData;
}
							
````							
