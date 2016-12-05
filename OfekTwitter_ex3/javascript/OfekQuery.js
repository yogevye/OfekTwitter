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
    var args = query.split(' ');
    console.log("--- args ---");
    console.log(args);
    this.elements = [];
    OfekQuery.filterElemnts(this.elements,bodyElements, args, args)

    console.log("^^^^^^^^^ this.elements  ^^^^^^^");
    console.log(this.elements);
    console.log("^^^^^^^^^^^^^^^^");
};

OfekQuery.prototype.all = function () {
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
};

OfekQuery.prototype.any =function () {
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
}

OfekQuery.prototype.filter = function(){
    var argumentsFunc =  Array.prototype.slice.call(arguments);
    if(this.elements.length ==0) return [];
    return this.elements.filter(function (element) {
        var bool = true;
        argumentsFunc.map(function (fn) {
            if(!fn(element)){bool = false};
        })
        return bool;
    })
}

OfekQuery.prototype.css = function (property, value) {
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].style[property] = value;
    }
}

OfekQuery.prototype.count = function () {
    return this.elements.length;
}

OfekQuery.prototype.appendChild = function (childElement) {
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].appendChild(childElement);
    }
}

OfekQuery.prototype.getAttribute = function (attributeName) {
    return this.elements.filter(function (element) {
        return element.attributeName[attributeName];
    });
}

OfekQuery.prototype.setAttribute = function (attributeName, attributeValue) {
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].attributeName[attributeName] = attributeValue;
    }
}

OfekQuery.prototype.get = function(index){
    return index < this.elements.length ? this.elements[index] : undefined;
}
OfekQuery.prototype.addClass = function(class_name){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].classList("class_name");
    }
}
OfekQuery.prototype.removeClass = function(class_name){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].classList.remove(class_name);
    }
}
OfekQuery.prototype.each = function(fn){
    for(var i=0; i<this.elements.length; i++){
        fn(this.elements[i]);
    }
}
OfekQuery.prototype.map = function(fn){
    return this.elements.map(function (element) {
        return fn(element);
    })
}


/* private functions */

OfekQuery.filterElemnts = function(elements,elementsToCheck, args, oreginalArgs){
    console.log(" ---- elementsToCheck --")
    console.log(elementsToCheck);

    console.log(" ---- args --")
    console.log(args.length == 1);
    if(args.length == 0 || elementsToCheck == null){return}
    if(args.length == 1){console.log("in1");OfekQuery.FilterByArg(elements,elementsToCheck, args[0],oreginalArgs);}
/*
    if(args.length == 1){
        OfekQuery.FilterByArg(elements,elementsToCheck, args[0],oreginalArgs);
        elementsToCheck.forEach(function (element) {
            OfekQuery.filterElemnts(elements, element.childNodes, args, oreginalArgs);
        })
    }*/
    OfekQuery.FilterByMulitiArgs(elementsToCheck, args,oreginalArgs);
}

OfekQuery.FilterByMulitiArgs = function(elements,elementsToCheck, args, originalArgs){

    console.log("----- originalArgs -----")
    console.log(originalArgs);

    var filterdElements = OfekQuery.filterArray(elementsToCheck,args[0]);
    var unfilteredElements = OfekQuery.ReversrfilterArray(elementsToCheck,args[0]);
    var filteredUnfilteredElementsByOriginalArgs = OfekQuery.filterArray(unfilteredElements, originalArgs[0]);
    var UnFilteredUnfilteredElementsByOriginalArgs = OfekQuery.ReversrfilterArray(unfilteredElements, originalArgs[0]);
    filterdElements.map(function (element) {
        OfekQuery.filterElemnts(elements,element.childNodes, args.splice(1), originalArgs);
    })
    filteredUnfilteredElementsByOriginalArgs.map(function (element) {
        OfekQuery.filterElemnts(elements,element.childNodes, originalArgs.splice(1), originalArgs);
    });
    UnFilteredUnfilteredElementsByOriginalArgs.map(function (element) {
        OfekQuery.filterElemnts(elements,element.childNodes, originalArgs, originalArgs);
    });
}

OfekQuery.FilterByArg = function(elements,elementsToCheck, arg, originalArgs){
    console.log("in");
    var filterdElements = OfekQuery.filterArray(elementsToCheck,arg);
    var unfilteredElements = OfekQuery.ReversrfilterArray(elementsToCheck,arg);
    /*filterdElements.map(OfekQuery.addChildToElemnts)*/;
    filterdElements.map(function (element) {

        elements.push(element);
    })
    unfilteredElements.map(function (element) {
        console.log("====== elements ===========")
        console.log(elements);
        if(element.childNodes){OfekQuery.filterElemnts(elements,element.childNodes, originalArgs, originalArgs)};
    })

}

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

/*
OfekQuery.addChildToElemnts = function(elemnt){
    this.elements.push(elemnt);
}*/

OfekQuery.getFilterFunc = function(arg){
    var type = arg[0];
    if(type == '.'){return OfekQuery.filterByClass(arg.substring(1));};
    if(type == '#'){return OfekQuery.filterByElementID(arg.substring(1));};
    return OfekQuery.filterByElementType(arg);
}

OfekQuery.filterByClass = function(className){
    return function(element) {
        return element.className == null ? false : element.className == className;
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
