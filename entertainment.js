window.onload = function(){
    document.getElementById("back").onclick = goBack;
    document.getElementById("openselect").onclick = selected;
    document.getElementById("openall").onclick = allSelected;
    document.getElementById("clear").onclick = removeLinks;
    chrome.storage.sync.get("listwebs", (data) => {
        printLinks(data);
    });
}

function goBack(){
    location.href = "popup.html";
}

function selected(){
    let check = document.getElementsByClassName("check");
    let links = document.getElementsByClassName("delete");
    for (var i = 0; i < links.length; i++){
        if(check[i].checked){
            let str = links[i].id;
            window.open(str, "_blank");
        }
    }
}
function allSelected(){
    let links = document.getElementsByClassName("delete");
    for (var i = 0; i < links.length; i++){
        let str = links[i].id;
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
function removeLinks(){
    let list = document.getElementsByTagName("span");
    let len = list.length;
    for(var i = 0; i < len; i++){
        list[0].remove();
    }
    removeData();
}
function removeData(){
    chrome.storage.sync.get("listwebs", (data) => {
        var websiteList = data.listwebs;
        for(var i = 0; i < websiteList.length; i++){
            if(websiteList[i].type == "entertainment"){
                websiteList.splice(i, 1);
                i = 0;
            }
        }
        chrome.storage.sync.set({"listwebs": websiteList});
    });
}
function printLinks(data){
    var websiteList = data.listwebs;
    for(var i = 0; i < websiteList.length; i++){
        if(websiteList[i].type == "entertainment"){
            let spanElement = document.createElement("span");
            let inputElement = document.createElement("input");
            let labelElement = document.createElement("label");
            let divElement = document.createElement("div");
            let brElement = document.createElement("br");
    
            spanElement.id = websiteList[i].url;
            inputElement.type = "checkbox";
            inputElement.id = i;
            inputElement.className = "check";
            labelElement.htmlFor = i;
            labelElement.className = "links";
            if(websiteList[i].url.length > 31){
                labelElement.textContent = websiteList[i].url.substring(0,31) + "...";
            }else{
                labelElement.textContent = websiteList[i].url;
            }
            divElement.className = "delete";
            divElement.id = websiteList[i].url;
            divElement.textContent = "x";
    
            document.body.appendChild(spanElement);
            spanElement.prepend(inputElement);
            spanElement.appendChild(labelElement);
            labelElement.appendChild(divElement);
            document.body.appendChild(brElement);
        }
       

    }
    
}


