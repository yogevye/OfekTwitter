/**
 * Created by Jbt on 11/30/2016.
 */
// run this function when the document is loaded


window.onload = function() {
    LoadAllTwits();
    document.getElementById("publish").addEventListener("click", publishTwith);
}

var Twits =
    [
        {username: 'Bobo', text: 'hello followers!'},
        {username: 'Elvis', text: 'this exercise is really easy!'},
        {username: 'Mimi', text: 'I want to go to sleep'}
    ];

var pic = "../../images/useravatar.png";

var user = "shalom";

function LoadAllTwits() {
    for(var i=0; i<Twits.length; i++){
        var twit = Twits[0];
        addTwit(twit.username, twit.text, pic);
    }
}

function publishTwith() {
    var publishTextera = document.getElementById("newTwitText").value;
    console.log("publishTextera: " + publishTextera)
    addTwit(user,publishTextera, pic);
    Twits.push({username: user, text: publishTextera});
}

function addTwit(user,msg,pic) {
    var newTwit = createNewTwit(user,msg,pic);
    var twitList = document.getElementById("twit-list");
    twitList.appendChild(newTwit);
}

function createNewTwit(user, msg, pic){
    var newTwit = document.createElement("div");
    newTwit.className="row twit";
    newTwit.appendChild(createNewImgDiv(pic));
    newTwit.appendChild(createNewUserDiv(user));
    newTwit.appendChild(createNewMsgDiv(msg));
    return newTwit;
}

function createNewImgDiv(pic) {
    var twitImgDiv =  document.createElement("div");
    twitImgDiv.classList.add("twit-img");
    twitImgDiv.appendChild(createNewImg(pic));
    return twitImgDiv;
}

function createNewUserDiv(user) {
    var twitUserDiv = document.createElement("div");
    twitUserDiv.classList.add("twit-usr");
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

