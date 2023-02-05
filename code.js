window.onload = function(){
    sessionStorage.setItem("items", 0);
    document.getElementById("back").onclick = goBack;
    document.getElementById("openselect").onclick = selected;
    document.getElementById("openall").onclick = allSelected;
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

