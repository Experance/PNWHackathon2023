window.onload = function(){
    document.getElementById("back").onclick = goBack;
    document.getElementById("openselect").onclick = selected;
    document.getElementById("openall").onclick = allSelected;
    //chrome.storage.sync.get("listwebs", printLinks(data));
}

function goBack(){
    location.href = "popup.html";
}

function selected(){
    let check = document.getElementsByClassName("check");
    let links = document.getElementsByClassName("links");
    for (var i = 0; i < links.length; i++){
        if(check[i].checked){
            let str = "https://" + links[i].innerHTML;
            window.open(str, "_blank");
        }
    }
}
function allSelected(){
    let links = document.getElementsByClassName("links");
    for (var i = 0; i < links.length; i++){
        let str = "https://" + links[i].innerHTML;
        window.open(str, "_blank");
    }
}
function minusSpan(str){
    // If statement used so user can't delete extra divs.
    console.log(document.getElementsByTagName().getElementById(str).remove())
    /*
    chrome.storage.sync.get("listwebs", function(data){
        for(var j = 0; j < data.listwebs.length; j++){
            chrome.storage.sync.remove(data.listwebs[j]);
        }
    })
    */
   
    
}
function printLinks(data){
    for(var i = 0; i < data.length; i++){
        let spanElement = document.createElement("span");
        let inputElement = document.createElement("input");
        let labelElement = document.createElement("label");
        let divElement = document.createElement("div");
        let brElement = document.createElement("br");

        spanElement.id = data[i];
        inputElement.type = "checkbox";
        inputElement.id = i;
        inputElement.className = "check";
        labelElement.htmlFor = "i";
        labelElement.className = "links";
        labelElement.textContent = data[i];
        divElement.className = "delete";
        divElement.id = data[i];

        document.body.appendChild(spanElement);
        spanElement.prepend(inputElement);
        spanElement.appendChild(labelElement);
        labelElement.appendChild(divElement);
        document.body.appendChild(brElement);

    }
    
}


