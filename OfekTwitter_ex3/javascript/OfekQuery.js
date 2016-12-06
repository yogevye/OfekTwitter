/**
 * Created by Jbt on 12/5/2016.
 */
/**
 * Created by Jbt on 12/5/2016.
 */

var $ = function (query) {
    return new OfekQuery(query);
}

var OfekQuery = function(query) {
    var bodyElements = document.body.childNodes;
    this.elements = [];
    this.filterElemnts(this.elements,bodyElements, query.split(' '))
};

OfekQuery.prototype = {

    filterElemnts: function(elements,elementsToCheck, queryArray){
        if(queryArray.length == 0 || elementsToCheck.length == 0){return}
        var firstArg = queryArray[0];
        var filterdElements = OfekQuery.filterArray(elementsToCheck,firstArg);
        var unfilteredElements = OfekQuery.ReversrfilterArray(elementsToCheck,firstArg);
        if(queryArray.length == 1){
            filterdElements.map(OfekQuery.prototype.addChildToElements(elements));
            filterdElements.map(OfekQuery.prototype.FilterNextNodes(elements,queryArray));
        }
        filterdElements.map(OfekQuery.prototype.FilterNextNodes(elements,queryArray.slice(1)));
        unfilteredElements.map(OfekQuery.prototype.FilterNextNodes(elements,queryArray));
    },

    addChildToElements: function(elements){
       return function(elemnt){
           elements.push(elemnt);
       }
    },
    
    FilterNextNodes: function (elements,queryArray) {
        return function (element) {
            OfekQuery.prototype.filterElemnts(elements,element.childNodes, queryArray);
        }
    },
    
    all: function () {
        if(this.elements.length ==0) return true;
        var argumentsFunc =  Array.prototype.slice.call(arguments);
        var sizeBeforeFilter = this.elements.length;
        var filtered  = this.elements.filter(function (element) {
            var bool = true;
            argumentsFunc.map(function (fn) {
                if(!fn(element)){bool = false};
            })
            return bool;
        })
        return filtered.length == sizeBeforeFilter;
    },

    any: function () {
        if(this.elements.length ==0) return false;
        var argumentsFunc =  Array.prototype.slice.call(arguments);
        var filtered  = this.elements.filter(function (element) {
            var bool = true;
            argumentsFunc.map(function (fn) {
                if(!fn(element)){bool = false};
            })
            return bool;
        })
        return filtered.length > 0;
    },

    filter: function(){
        var argumentsFunc =  Array.prototype.slice.call(arguments);
        if(this.elements.length ==0) return [];
        return this.elements.filter(function (element) {
            var bool = true;
            argumentsFunc.map(function (fn) {
                if(!fn(element)){bool = false};
            })
            return bool;
        })
    },

    css: function (property, value) {
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].style[property] = value;
        }
    },

    count: function () {
        return this.elements.length;
    },

    getAttribute: function (attributeName) {
        console.log(this.elements);
        return this.elements.filter(function (element) {
            return element[attributeName];
        })},

    setAttribute: function (attributeName, attributeValue) {
        for(var i=0; i<this.elements.length; i++){
            this.elements[i][attributeName] = attributeValue;
        }},

    get: function(index){
        return index < this.elements.length ? this.elements[index] : undefined;
    },

    addClass: function(class_name){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].className += " " + class_name;
        }},

    removeClass: function(class_name){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].classList.remove(class_name);
        }},

    each: function(fn){
        for(var i=0; i<this.elements.length; i++){
            fn(this.elements[i]);
        }},

    map: function(fn){
        return this.elements.map(function (element) {
            return fn(element);
        })},
}

/* private functions */
OfekQuery.filterArray = function (list, arg) {
    if(list.length == 0) return [];
    var arr = Array.isArray(list) ? list : Array.prototype.slice.call(list);
    var filterFunc = OfekQuery.getFilterFunc(arg);
    return arr.filter(filterFunc);
}

OfekQuery.ReversrfilterArray = function(list, arg){
    if(list.length == 0) return [];
    var arr = Array.isArray(list) ? list : Array.prototype.slice.call(list);
    var filterFunc = OfekQuery.getFilterFunc(arg);
    return arr.filter(function (element) {
        return !filterFunc(element);
    })
}

OfekQuery.getFilterFunc = function(arg){
    var type = arg[0];
    if(type == '.'){return OfekQuery.filterByClass(arg.substring(1));};
    if(type == '#'){return OfekQuery.filterByElementID(arg.substring(1));};
    return OfekQuery.filterByElementType(arg);
}

OfekQuery.filterByClass = function(className){
    return function(element) {
        var elementClass = element.className;
        if (elementClass == null) return false;
        if (elementClass.indexOf(className) == -1)return false;
        classList = elementClass.split(' ');
        for(var i=0; i<classList.length; i++){if (classList[i] == className) return true;}
        return false;
    }
}

OfekQuery.filterByElementID = function(id){
    return function(element) {
        return element.id == null ? false : element.id == id;
    }
}

OfekQuery.filterByElementType = function(type){
    return function(element) {
        return element.tagName == null ? false : element.tagName.toLowerCase() == type;

    }
}
