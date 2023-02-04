function $(x) {return document.getElementById(x);}
var testing = false;
window.onload=function main() {
    // preloads popup content 
    start(false);

    $("startprocess").addEventListener("click", (event) => {
        start(true);
    });
}

// function for when the start/stop button is clicked (also saves data after closure)
function start(name) {
    if (name) { 
        chrome.storage.sync.get("start", (result) => {
            var placeHolder = result.start;
            if (placeHolder === "true") {
                chrome.storage.sync.set({"start": "false"});
                start(false);
            } else {
                chrome.storage.sync.set({"start": "true"});
                start(false);
            }
        } );
    }
    // https://w3schools.com/jsref/dom_obj_style.asp
    var styleing = document.querySelector("#startprocess").style;
    chrome.storage.sync.get("start", (result) => {
        
        if (result.start === "true") {
            $("startprocess").innerHTML = "Start";
            styleing.backgroundColor = "rgb(21, 192, 21)";
            styleing.color = "black";
            testing = false;
            
            chrome.storage.sync.set({"start": "true"});
        } else {    
            styleing.color = "white";
            styleing.backgroundColor = "red";

        
            //var styleing2 = document.querySelector("#startprocess:hover").style;
            //styleing.cssText = "#startprocess:hover {background-color: 'lightred'}";
            //styleing2.backgroundColor = "lightred";

            $("startprocess").innerHTML = "Stop";
            testing = true;
            chrome.storage.sync.set({"start": "false"});
        } 
    });
    
    
}
