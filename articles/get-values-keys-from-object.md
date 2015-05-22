## JS tips how to get keys or values from object

below code is how to get keys from object

```` javascript
function getObjectValues(object) 
{
    var values = [];
    for (var property in object)
      values.push(object[property]);
    return values;
}

````
below code is how to get values from object 

````javascript
function getObjectValues(object) 
{
    var values = [];
    for (var property in object)
      values.push(object[property]);
    return values;
}

````