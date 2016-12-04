/**
 * Created by Jbt on 11/30/2016.
 */
// run this function when the document is loaded


window.onload = function() {
    LoadAllTwits();
    newTestDiv(test_group,"Selector");
    document.getElementById("publish").addEventListener("click", publishTwith);
    $('div ul');

}

var Twits =
    [
        {username: 'Bobo', text: 'hello followers!'},
        {username: 'Elvis', text: 'this exercise is really easy!'},
        {username: 'Mimi', text: 'I want to go to sleep'}
    ];

var pic = "../../images/useravatar.png";

var user = "Hachapuri";

function LoadAllTwits() {
    var isNewTwit = false;
    for(var i=0; i<Twits.length; i++){
        var twit = Twits[0];
        addTwit(twit.username, twit.text, pic, isNewTwit);
    }
}

function publishTwith() {
    var isNewTwit = true;
    var publishTextera = document.getElementById("newTwitText").value;
    console.log("publishTextera: " + publishTextera)
    addTwit(user,publishTextera, pic, isNewTwit);
    Twits.push({username: user, text: publishTextera});
}

function addTwit(user,msg,pic, isNewTwit) {
    var newTwit = createNewTwit(user,msg,pic, isNewTwit);
    var twitList = document.getElementById("twit-list");
    twitList.appendChild(newTwit);
}

function createNewTwit(user, msg, pic, isNewTwit){
    var newTwit = document.createElement("div");
    newTwit.className="row twit";
    newTwit.appendChild(createNewImgDiv(pic));
    newTwit.appendChild(createNewUserDiv(user, isNewTwit));
    newTwit.appendChild(createNewMsgDiv(msg));
    return newTwit;
}

function createNewImgDiv(pic) {
    var twitImgDiv =  document.createElement("div");
    twitImgDiv.classList.add("twit-img");
    twitImgDiv.appendChild(createNewImg(pic));
    return twitImgDiv;
}

function createNewUserDiv(user,isNewTwit) {
    var twitUserDiv = document.createElement("div");
    isNewTwit ? twitUserDiv.className = "twit-my-usr" :  twitUserDiv.className = "twit-usr";
    var msg_text = document.createTextNode(user);
    twitUserDiv.appendChild(msg_text);
    return twitUserDiv;
}

function createNewMsgDiv(msg) {
    var twitUserDiv = document.createElement("div");
    twitUserDiv.classList.add("twit-msg");
    var msg_text = document.createTextNode(msg);
    twitUserDiv.appendChild(msg_text);
    return twitUserDiv;
}

function createNewImg(picture){
    var newImg = document.createElement('img');
    newImg.src= picture;
    return newImg;
}

/* ########################################## */

function runTests() {

}

function runtest() {

}

function assert(value, name){
    var success = name + " succeeded";
    var failed = name + " failed";
    //value ? console.log(success) : console.log(failed);
    return value ? success : failed;
}

function liAssert(value, name) {
    var li = document.createElement("li");
    li.className = value ? "success" : "faied";
    li.textContent = assert(value,name);
    return li;
}

function test1() {
    return 1==1;
}



function NumOfTwits(){
    var twitList = document.getElementById("twit-list");
    var divs = twitList.querySelectorAll('.twit');
    return divs.length == 5;
}

function test_group(divRow, className) {
    var ul = document.createElement("ul");
    className != undefined ? ul.className = className : ul.className ="";
    ul.appendChild(liAssert(test1(),"test1"));
    ul.appendChild(liAssert(NumOfTwits(),"counting 5 tweet-username classes under ot-body class"));
    ul.appendChild(liAssert(test1(),"test1"));
    divRow.appendChild(ul);

}

function newTestDiv(test_group, header) {
    var testDiv = document.getElementById("testContainer");
    var row = document.createElement('div');
    row.className = "row testRow";
    console.log("in1: " + row.className);
    var h = document.createElement("H5")
    var t = document.createTextNode("Selectors");
    h.appendChild(t);
    row.appendChild(h);
    test_group(row);
    testDiv.appendChild(row);
}

/*   ########################################################################  */


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
