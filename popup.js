window.onload=function () {
    // preloads popup content 
    document.getElementById("addfolder").onclick = newFolderMode;
    document.getElementById("code").onclick = switchToCode;
    document.getElementById("school").onclick = switchToSchool;
    document.getElementById("socialmedia").onclick = switchToMedia;
    document.getElementById("entertainment").onclick = switchToEntertain;
    document.getElementById("miscellaneous").onclick = switchToMisc;
    document.getElementById("settings").onclick = openOptions;
    document.getElementById("foldername").addEventListener("keypress", (element) => {
        if (element.key === "Enter") {
            element.preventDefault();
            //save data
            addFolder();

        } 
    });
    
    
}

var fileName;

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
function newFolderMode(){
    //document.getElementById("settings").style.opacity = 0.2;
    //for(const element of document.getElementsByClassName("selections")){element.style.opacity = 0.2;}
    let name = document.getElementById("foldername");
    for(let element of document.getElementsByClassName("visibility")){
        element.setAttribute("hidden", "hidden");
        element.setAttribute("style", "display:none;");
    }
    document.body.style.backgroundColor = "grey";
    name.style.position = "absolute";
    name.style.top = "25%";
    name.style.left = "20%";
    name.type = "visible";
    name.focus();
}
function addFolder(){
    let name = document.getElementById("foldername");
    fileName = name.value;
    /*BELOW
        Basically what it does is it checks if new folder name alrdy extis, if no then it accesses current storagge
        and will put in the new folder name storageTravers() will put the names into an array
    */

    if(localStorage.getItem("New Folder") != null && storageTraverse().includes(name.value)){
        alert("File Name already exists")
    }else{
        if(fileName != null && fileName != "" && fileName != "undefined" && fileName != "NaN"){
            if(localStorage.getItem("New Folder") == null){
                localStorage.setItem("New Folder", name.value);
            }else{
                 localStorage.setItem("New Folder", [localStorage.getItem("New Folder"), name.value]);
            }
        }
    
    }
    
    name.value = "";
    document.body.style.backgroundColor = "white";
    document.getElementById("foldername").type = "hidden";
    for(const element of document.getElementsByClassName("visibility")){
        element.removeAttribute("hidden");
        element.removeAttribute("style");
    }
}
function storageTraverse(){
    var fold = [];
    var str = "";
    for(let i = 0; i < localStorage.getItem("New Folder").length; i++){
        if(localStorage.getItem("New Folder")[i] != ","){
            if(localStorage.getItem("New Folder")[i + 1] == null){
                str += localStorage.getItem("New Folder")[i];
                fold.push(str);
            }else{
                str += localStorage.getItem("New Folder")[i];
            }
        }else{
            fold.push(str);
            str = "";
        }
     
    }
    return fold; 
}

function removeFolders(){

}
// a function to open settings
function openOptions() { 
    window.open("options.html");
}