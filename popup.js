window.onload=function () {
    // preloads popup content 
    document.getElementById("code").onclick = switchToCode;
    document.getElementById("school").onclick = switchToSchool;
    document.getElementById("socialmedia").onclick = switchToMedia;
    document.getElementById("entertainment").onclick = switchToEntertain;
    document.getElementById("miscellaneous").onclick = switchToMisc;
    document.getElementById("settings").onclick = openOptions;
    document.getElementById("homes").onclick = switchToHome;
}
function switchToHome(){
    location.href = "home.html";
}

function switchToSchool(){
    location.href = "school.html";
}

function switchToCode(){
    location.href = "code.html";
}
function switchToMedia(){
    location.href = "socialmedia.html";
}
function switchToEntertain(){
    location.href = "entertainment.html";
}
function switchToMisc(){
    location.href = "miscellaneous.html";
}
// a function to open settings
function openOptions() { 
    window.open("options.html");
}