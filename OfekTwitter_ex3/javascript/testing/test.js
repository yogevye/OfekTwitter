/**
 * Created by Jbt on 12/4/2016.
 */
/*
 $('div') // returns an OfekQuery object of all of the div elements in the page
 $('div .fancy') // returns an OfekQuery object of all div elements that have descendant elements of class "fancy"
 $('#baba-man') // returns an OfekQuery object of the element with id "baba-man"
 $('.pretty-box').addClass('big-box') // adds the "big-box" class to all of the elements of class "pretty-box"
 $('ul').filter(function(el) {
 return (el.childElementCount === 2);
 }) // returns a new OfekQuery object containing all ul elements that have exactly 2 children elements
 $('ul').any(function(el) {
 return el.childElementCount > 5
 }) // returns true if any ul elements have more than 5 children elements
 */

function filterElemnts(elmenets, args) {
    if(elmenets.length == 0 || arg.length ==0){return [];}
    var arg = args[0];
    var type = arg[0];
    var ans = [];
    var FilterBy = setFilterBy(type);

    elmenets.filter(function (element) {
        return FilterBy(element, type);
    });
    if(arg.length == 1){
        return elmenets;
    }
    else{
        elmenets.forEach(function (element) {
            ans.concat(element.args.splice(1));
        })
    }
    return ans;
}

function setFilterBy(type){
    if(type == '.'){return filterByClass;};
    if(type == '#'){return filterByElementID;};
    return filterByElementType;
}

function filterByClass(element, className){
    return element.className == className;
}

function filterByElementType(element, type){
    return element.tagName == type;
}

function filterByElementType(element, className){

}
function filterByElementID(element, id){
    return element.id == id;
}

function getElements() {
    var elements =
}

var $ = (function(testString) {

    var elements = document.body.childNodes;
    console.log("$: " + testString);
    var args = testString.split(' ');
    var elements = filterElemnts(elements, args)
    console.log(elements);
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


