window.onload = function(){
    document.getElementById("continue").onclick = switchs;
    document.getElementById("settings").onclick = openOptions;
    
}
function switchs(){
    location.href = "popup.html";

}
// a function to open settings
function openOptions() { 
    window.open("options.html");
}