window.onload = function(){
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

