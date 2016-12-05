
/*
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

function liAssert(value, name, ul) {
    var li = document.createElement("li");
    li.className = value ? "success" : "faied";
    li.textContent = assert(value,name);
    ul.appendChild(li);
}

function test1() {
    return 1==1;
}



function NumOfTwits(){
    var twitList = document.getElementById("twit-list");
    var divs = twitList.querySelectorAll('.twit');
    return divs.length == 5;
}


function Runtest_group(divRow,test_group, className) {
    var ul = document.createElement("ul");
    className != undefined ? ul.className = className : ul.className ="";
    for(var i=0; i<test_group.length; i++){
        liAssert(test_group[i])
    }

    liAssert(test1(),"test1",ul);
    liAssert(NumOfTwits(),"counting 5 tweet-username classes under ot-body class",ul);
    liAssert(test1(),"test1",ul);
    divRow.appendChild(ul);

}*/

function assert(value, name){
    var success = name + " succeeded";
    var failed = name + " failed";
    //value ? console.log(success) : console.log(failed);
    return value ? success : failed;
}

/*
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

test_group('first test group', function() {
    assert(true, "simple successful test");
    assert(true, "simple successful test 2");
    assert(false, "simple unsuccessful test");
});
*/
test_group('second test group', function() {
    assert(true, "simple successful test");
    assert(true, "simple unsuccessful test 2");
    assert(true, "simple unsuccessful test 3");
});

function newTestDiv(test_group, testname) {
    var testDiv = document.getElementById("testContainer");
    var row = document.createElement('div');
    row.className = "row testRow";;
    var h = document.createElement("H5")
    var t = document.createTextNode("testname");
    h.appendChild(t);
    row.appendChild(h);
    var ul = document.createElement("ul");
    ul.

    test_group(row);
    testDiv.appendChild(row);
}