## A way to set config for addbutton of Panel in Extjs

Via read source code of addButton(http://docs.sencha.com/extjs/3.4.0/source/Panel.html#Ext-Panel-method-addButton), we can found out that there is a 
handler parameter could be passed by outside or in the config itself.
````javascript
    addButton : function(config, handler, scope){
        if(!this.fbar){
            this.createFbar([]);
        }
        if(handler){
            if(Ext.isString(config)){
                config = {text: config};
            }
            config = Ext.apply({
                handler: handler,
                scope: scope
            }, config);
        }
        return this.fbar.add(config);
    },

````
so their are 2 ways to set the handler for buttons on the pannel.
one is just add handler in the config
````javascript
 this.addButton({
                    text: Label,
                    Config: config,
                    disabled: true,
					handler:function(){
						fireEvent('do event');
					}
                }, null, this);
````

another way could be passed the handler parameter

````javascript
 this.addButton({
                    text: config.Label,
                    Config: config,
                    disabled: true
                }, config.handler ? config.handler : this.onButtonClick, this);
...,
onButtonClick:function(){
	fireEvent('still needs fire Event for trigger click event');
}

````