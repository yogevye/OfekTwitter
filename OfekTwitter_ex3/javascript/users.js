/**
 * Created by Jbt on 11/30/2016.
 */
window.onload = function() {
    LoadFollowUsersList();
    LoadUnFollowUsersList();

    //document.getElementById("publish").addEventListener("click", publishTwith);
}

var FollowUsers = ["user1","user6","user7","user8","user9","user10",]
var UnFollowUsers = ["user2","user3","user4","user5"];
var pic = "../../images/useravatar.png";


function newCard(user) {
    var userBox = document.createElement("div");
    userBox.className="card";

    userBox.appendChild(createNewImgLi(pic, "list-group-item"),createNewLiNameUser(user, list-group-item), )
}

function createNewLi(className,arrchildAppend) {
    var newImgLi =  document.createElement("li");
    return newImgLi;
    for(var i=0; arrchildAppend!=undefined && i<arrchildAppend; i++){
        newImgLi.appendChild(arrchildAppend[i]);
    }
}

function createNewImgLi(pic, className) {
    var newImgLi =  document.createElement("li");
    className != undefined ? newButton.className = className : newButton.className ="";
    newImgLi.appendChild(createNewImg(pic));
    return newImgLi;
}

function createNewLiNameUser(user, className) {
    var newLiNameUser =  document.createElement("li");
    className != undefined ? newButton.className = className : newButton.className ="";
    newLiNameUser.value = user;
    return newLiNameUser;
}


function createNewButton(text,className) {
    var newButton = document.createElement('button');
    className != undefined ? newButton.className = className : newButton.className ="";
    newButton.value = text;
}

function createNewImg(picture, className){
    var newImg = document.createElement('img');
    className != undefined ? newImg.className = className : newImg.className ="";
    newImg.src= picture;
    return newImg;
}