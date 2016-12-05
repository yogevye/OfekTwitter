/**
 * Created by Jbt on 12/5/2016.
 */
/**
 * Created by Jbt on 12/5/2016.
 */
/**
 * Created by Jbt on 12/5/2016.
 */

var $ = function (query) {
    return new OfekQuery(query);
}

var OfekQuery = function(testString) {
    var bodyElements = document.body.childNodes;
    var args = testString.split(' ');
    this.elements = [];
    OfekQuery.filterElemnts(elements,bodyElements, args, args)

    console.log("^^^^^^^^^^^^^^^^");
    console.log(this.elements);
    console.log("^^^^^^^^^^^^^^^^");
};

OfekQuery.prototype.all = function () {
    if(this.elements.length ==0) return true;
    var sizeBeforeFilter = this.elements.length;
    this.elements.filter(function (element) {
        var bool = true;
        arguments.map(function (fn) {
            if(!fn(element)){bool = !bool};
        })
        return bool;
    })
    return this.elements.length == sizeBeforeFilter;
};

OfekQuery.prototype.any =function () {
    if(this.elements.length ==0) return false;
    this.elements.filter(function (element) {
        var bool = true;
        arguments.map(function (fn) {
            if(!fn(element)){bool = !bool};
        })
        return bool;
    })
    return this.elements.length > 0;
}

OfekQuery.prototype.filter = function(){
    if(this.elements.length ==0) return [];
    return this.elements.filter(function (element) {
        var bool = true;
        arguments.map(function (fn) {
            if(!fn(element)){bool = !bool};
        })
        return bool;
    })

}

OfekQuery.prototype.css = function (property, value) {
    this.elements.map(function (element) {
        element.style[property] = value;
    });
}

OfekQuery.prototype.count = function () {
    return this.elements.length;
}

OfekQuery.prototype.appendChild = function (childElement) {
    this.elements.map(function (element) {
        element.appendChild(childElement);
    })
}

OfekQuery.prototype.getAttribute = function (attributeName) {
    return this.elements.filter(function (element) {
        return element.attributeName[attributeName];
    });
}

OfekQuery.prototype.setAttribute = function (attributeName, attributeValue) {
    this.elements.map(function (element) {
        element.attributeName[attributeName] = attributeValue;
    });
}

OfekQuery.prototype.get = function(index){
    return index < this.elements.length ? this.elements[index] : undefined;
}



/* private functions */

OfekQuery.filterElemnts = function(elementsToCheck, args, oreginalArgs){
    if(args.length == 0 || elementsToCheck.length == 0){return}
    if(args.length == 1){OfekQuery.FilterByArg(elementsToCheck, args[0],oreginalArgs); return;}
    OfekQuery.FilterByMulitiArgs(elementsToCheck, args,oreginalArgs);
}

OfekQuery.FilterByMulitiArgs = function(elementsToCheck, args, originalArgs){

    var filterdElements = OfekQuery.filterArray(elementsToCheck,args[0]);
    var unfilteredElements = OfekQuery.ReversrfilterArray(elementsToCheck,args[0]);
    var filteredUnfilteredElementsByOriginalArgs = OfekQuery.filterArray(unfilteredElements, originalArgs[0]);
    var UnFilteredUnfilteredElementsByOriginalArgs = OfekQuery.ReversrfilterArray(unfilteredElements, originalArgs[0]);
    filterdElements.map(function (element) {
        OfekQuery.filterElemnts(element.childNodes, args.splice(1), originalArgs);
    })
    filteredUnfilteredElementsByOriginalArgs.map(function (element) {
        OfekQuery.filterElemnts(element.childNodes, originalArgs.splice(1), originalArgs);
    });
    UnFilteredUnfilteredElementsByOriginalArgs.map(function (element) {
        OfekQuery.filterElemnts(element.childNodes, originalArgs, originalArgs);
    });
}

OfekQuery.FilterByArg = function(elementsToCheck, arg, originalArgs){
    var filterdElements = OfekQuery.filterArray(elementsToCheck,arg);
    var unfilteredElements = OfekQuery.ReversrfilterArray(elementsToCheck,arg);
    filterdElements.map(OfekQuery.prototype.addChildToElemnts);
    unfilteredElements.map(function (element) {
        OfekQuery.filterElemnts(element.childNodes, originalArgs, originalArgs);
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


OfekQuery.prototype.addChildToElemnts = function(elemnt){
    this.elements.push(elemnt);
}

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





