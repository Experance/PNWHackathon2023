window.onload = function(){
    document.getElementById("back").onclick = goBack;
    document.getElementById("openselect").onclick = selected;
}

function goBack(){
    location.href = "popup.html";
}

function selected(){
    let links = document.getElementsByClassName("links");
    for (var i = 0; i < links.length; i++){
        //if(links[i].selected){
            let str = links[i].innerHTML;
           chrome.tabs.create({url: str})
        //}
    }
}

