/**
 * Created by Jbt on 12/4/2016.
 */

var $ = (function(testString) {
    var elements = document.querySelectorAll('testString');
    return {
        any: function(){
            elements.forEach(function (element) {
                var bool = true;
                arguments.forEach(function(argument){
                    if(argument(element) == false){bool = !bool};
                })
                if(bool){return true;}
            });
            return false;
        },
        all: function(){
            elements.forEach(function (element) {
                var bool = true;
                arguments.forEach(function(argument){
                    if(argument(element) == false){bool = !bool};
                })
                if(!bool){return false;}
            });
            return true;
        },
        filter: function(){
            arguments.forEach(function (argument) {
                argument.filter(argument);
            })
        },
        css: function(property, value){
        },
        count: function(property, value){
            return elements.size();
        },
        getAttribute: function(attributeName){

        },
        get: function(index){
            
        }
    };
})();






