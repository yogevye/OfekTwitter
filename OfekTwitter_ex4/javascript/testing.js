var newTsigDiv = function () {
    var testDiv = document.getElementById("testContainer");
    var row = document.createElement('div');
    row.className = "row testRow";
    testDiv.appendChild(row);
    return row;
}

var addHeaderToRow = function (row, headerText) {
    var elementTitle = document.createElement("H5")
    var t = document.createTextNode(headerText);
    elementTitle.appendChild(t);
    row.appendChild(elementTitle);
}


test_group = function (name, asseers) {
    var row = newTsigDiv();
    addHeaderToRow(row, name);
    this.testGroupUl = document.createElement("ul");
    row.appendChild(this.testGroupUl);
    asseers();
};

function assert(value, name) {
    var li = document.createElement("li");
    li.className = value ? "success" : "failed";
    li.textContent = name;
    testGroupUl.appendChild(li);
}

function test1() {
    return $('.navbar-brand').count() == 2;
}

function test2() {
    return $('#twit-list .twit').count() == 4
}

function test3() {
    return $('div').get(0).className == "container";
}
function test4() {
    $('.container').addClass("testingClass");
    return $('div').get(0).className.indexOf("testingClass") != -1;
}
function test5() {
    $('.container').removeClass("testingClass");
    return $('div').get(0).className.indexOf("testingClass") == -1;
}
function test6() {
    $('#testContainer li').addClass("testing-li");
    return $('#testContainer li').get(0).className.indexOf("testing-li") != -1;
}
