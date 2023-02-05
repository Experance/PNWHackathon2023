window.onload=function () {
    // preloads popup content 
    document.getElementById("code").onclick = switchToCode;
    document.getElementById("school").onclick = switchToSchool;
    document.getElementById("settings").onclick = openOptions;
}

function switchToSchool(){
    location.href = "school.html";
}

function switchToCode(){
    location.href = "code.html";
}
// a function to open settings
function openOptions() { 
    window.open("options.html");
}