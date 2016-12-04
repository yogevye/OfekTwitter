/**
 * Created by Jbt on 11/30/2016.
 */


var users = [{name:"user1",follow:true, id:0},
    {name:"user6",follow:true, id:1},
    {name:"user7",follow:true, id:2},
    {name:"user8",follow:true, id:3},
    {name:"user9",follow:true, id:4},
    {name:"user2",follow:false, id:5},
    {name:"user3",follow:false, id:6},
    {name:"user4",follow:false, id:7},
    {name:"user5",follow:false, id:8},
    {name:"user10",follow:false, id:9}];


var followText = "follow";
var UnfollowText = "unfollow";
var pic = "../../images/useravatar.png";
UnfolllowElement = undefined;
FollowElement = undefined;


window.onload = function() {
    LoadAllUsers();
    searchUsers();
}

function searchUsers() {
    var searchElement = document.getElementById("search");
    searchElement.addEventListener("input", keypressed);
    function keypressed() {
        var searchString = searchElement.value;
        var cards = UnfolllowElement.querySelectorAll('div');

        for (var i = 0; i < cards.length; ++i) {
            var card = cards[i];
            user = users.filter(function (user) {
                return user.id == card.id;
            })[0];
            console.log("substring: " + user.name.substring(0,searchString.length));
            user.name.substring(0,searchString.length) == searchString ? card.style.display = '' : card.style.display = 'none';
        }
    }
}

function LoadAllUsers() {
    UnfolllowElement = document.getElementById("UnFollowUsersList");
    FollowElement = document.getElementById("followUsersList");

    for (var i=0; i<users.length; i++){
        console.log("user name: " + users[i].name + "user follow: " +users[i].follow);
        var newUserCard = CreateUserCard(users[i]);
        users[i].follow ? FollowElement.appendChild(newUserCard) : UnfolllowElement.appendChild(newUserCard);
    }
}

function CreateUserCard(user) {
    var userCard = document.createElement("div");
    var followClassName = "card";
    var UnfollowClassName = "card col-xs-2";
    var action = CardButtonAction(user.id, followClassName, UnfollowClassName);
    var ul = document.createElement("ul");
    var imgLi = document.createElement("li");
    var ButtonLi = document.createElement("li");
    var NameLi = document.createElement("li");
    var NameLi = document.createElement("li");

    userCard.id = user.id;
    userCard.className= user.follow ? followClassName : UnfollowClassName;
    ul.className = "list-group list-group-flush";
    userCard.appendChild(ul);
    imgLi.className  = "list-group-item";
    AddImg(imgLi,pic,"center-block");
    ButtonLi.className = "list-group-item";
    AddFollowButton(ButtonLi,user.follow,action,"btn btn-primary center-block");
    NameLi.className = "list-group-item user-name";
    NameLi.textContent = user.name;
    ul.appendChild(imgLi);
    ul.appendChild(ButtonLi);
    ul.appendChild(NameLi);
    return userCard;
}

function AddImg(parentElement, pic, className) {
    var newImg = document.createElement('img');
    newImg.src= pic;
    className != undefined ? newImg.className = className : newImg.className ="";
    parentElement.appendChild(newImg);
}

function AddFollowButton(parentElement, isFollow,action, className) {
    var newButton = document.createElement('button');
    className != undefined ? newButton.className = className : newButton.className ="";

    newButton.textContent = isFollow ? UnfollowText : followText;
    parentElement.appendChild(newButton);
    console.log("button value : " + newButton.value);
    action(isFollow, newButton);
}


var CardButtonAction = function(userCardID,followClassName,UnfollowClassName)
{
    var userCardID = userCardID;
    console.log("userId: " + userCardID);
    function action(isFollow, followButton) {
        var isFollow = isFollow;
        var followButton = followButton;
        followButton.addEventListener("click", Click);
        function Click() {
            if (isFollow) {
                removedUserCard = FollowElement.removeChild(document.getElementById(userCardID));
                UnfolllowElement.appendChild(removedUserCard);
                followButton.textContent = followText;
                removedUserCard.className = UnfollowClassName;
                isFollow = !isFollow;
            }
            else {
                removedUserCard = UnfolllowElement.removeChild(document.getElementById(userCardID));
                FollowElement.appendChild(removedUserCard);
                followButton.textContent = UnfollowText;
                removedUserCard.className = followClassName;
                isFollow = !isFollow;
            }
        }
    }
    return action;
}

