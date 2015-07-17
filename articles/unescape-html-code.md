#The tips of js development

In some case there is html code to display in textbox or label, it's not human world, so that's need unescape the html code,
and some JS libraries are include this function, such as string.js and underscore.js.


````javascript
this.unescapeHTML = function(str) {
  var escapeChars = { lt: '<', gt: '>', quot: '"', apos: "'", amp: '&' };
  return str.replace(/\&([^;]+);/g, function(entity, entityCode) {
	  var match;
	  if ( entityCode in escapeChars) {
		  return escapeChars[entityCode];
	  } else if ( match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
		  return String.fromCharCode(parseInt(match[1], 16));
	  } else if ( match = entityCode.match(/^#(\d+)$/)) {
		  return String.fromCharCode(~~match[1]);
	  } else {
		  return entity;
	  }
  });
};
````  
some test code

````javascript
console.log(this.unescapeHTML('&amp'));
=> &

````
Its reference from stackoverflow: http://stackoverflow.com/questions/17678694/replace-html-entities-e-g-8217-with-character-equivalents-when-parsing-an