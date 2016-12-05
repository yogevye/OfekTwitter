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

var OfekQuery = (function () {
    function constructor(query) {
        var bodyElements = document.body.childNodes;
        var args = query.split(' ');
        this.elements = [];
        filterElemnts(bodyElements, args, args)

        console.log("^^^^^^^^^^^^^^^^");
        console.log(this.elements);
        console.log("^^^^^^^^^^^^^^^^");
    }

    /* public funcs */
    constructor.all = function () {
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

    constructor.any =function () {
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

    constructor.filter = function(){
        if(this.elements.length ==0) return [];
        return this.elements.filter(function (element) {
            var bool = true;
            arguments.map(function (fn) {
                if(!fn(element)){bool = !bool};
            })
            return bool;
        })

    }

    constructor.css = function (property, value) {
        this.elements.map(function (element) {
            element.style[property] = value;
        });
    }

    constructor.count = function () {
        return this.elements.length;
    }

    constructor.appendChild = function (childElement) {
        this.elements.map(function (element) {
            element.appendChild(childElement);
        })
    }

    constructor.getAttribute = function (attributeName) {
        return this.elements.filter(function (element) {
            return element.attributeName[attributeName];
        });
    }

    constructor.setAttribute = function (attributeName, attributeValue) {
        this.elements.map(function (element) {
            element.attributeName[attributeName] = attributeValue;
        });
    }

    constructor.get = function(index){
        return index < this.elements.length ? this.elements[index] : undefined;
    }

    /* end public funcs */

    /* private funcs */

    var filterElemnts = function(elementsToCheck, args, oreginalArgs){
        if(args.length == 0 || elementsToCheck.length == 0){return}
        if(args.length == 1){FilterByArg(elementsToCheck, args[0],oreginalArgs); return;}
        FilterByMulitiArgs(elementsToCheck, args,oreginalArgs);
    }

    var FilterByMulitiArgs = function(elementsToCheck, args, originalArgs){

        var filterdElements = filterArray(elementsToCheck,args[0]);
        var unfilteredElements = ReversrfilterArray(elementsToCheck,args[0]);
        var filteredUnfilteredElementsByOriginalArgs = filterArray(unfilteredElements, originalArgs[0]);
        var UnFilteredUnfilteredElementsByOriginalArgs = ReversrfilterArray(unfilteredElements, originalArgs[0]);
        filterdElements.map(function (element) {
            filterElemnts(element.childNodes, args.splice(1), originalArgs);
        })
        filteredUnfilteredElementsByOriginalArgs.map(function (element) {
            filterElemnts(element.childNodes, originalArgs.splice(1), originalArgs);
        });
        UnFilteredUnfilteredElementsByOriginalArgs.map(function (element) {
            filterElemnts(element.childNodes, originalArgs, originalArgs);
        });
    }

    var  FilterByArg = function(elementsToCheck, arg, originalArgs){
        var filterdElements = filterArray(elementsToCheck,arg);
        var unfilteredElements = ReversrfilterArray(elementsToCheck,arg);
        filterdElements.map(addChildToElemnts);
        unfilteredElements.map(function (element) {
            filterElemnts(element.childNodes, originalArgs, originalArgs);
        })

    }

    var filterArray = function (list, arg) {
        if(list.length == 0) return [];
        var arr = Array.isArray(list) ? list : Array.prototype.slice.call(list);
        var filterFunc = getFilterFunc(arg);
        return arr.filter(filterFunc);
    }

    var ReversrfilterArray = function(list, arg){
        if(list.length == 0) return [];
        var arr = Array.isArray(list) ? list : Array.prototype.slice.call(list);
        var filterFunc = getFilterFunc(arg);
        return arr.filter(function (element) {
            return !filterFunc(element);
        })
    }


    var addChildToElemnts = function(elemnt){
        this.elements.push(elemnt);
    }

    var getFilterFunc = function(arg){
        var type = arg[0];
        if(type == '.'){return filterByClass(arg.substring(1));};
        if(type == '#'){return filterByElementID(arg.substring(1));};
        return filterByElementType(arg);
    }

    var filterByClass = function(className){
        return function(element) {
            return element.className == null ? false : element.className == className;
        }
    }

    var filterByElementID = function(id){
        return function(element) {
            return element.id == null ? false : element.id == id;
        }
    }

    var filterByElementType = function(type){
        return function(element) {
            return element.tagName == null ? false : element.tagName.toLowerCase() == type;

        }
    }

    /* end private funcs */

    return constructor;
})();











