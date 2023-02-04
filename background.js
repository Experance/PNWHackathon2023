// object templates
var coding = {title:"", url:"", type:"coding"};
var school = {title:"", url:"", type:"school"};


var websiteList = [];

// adds an array into the storage
chrome.storage.sync.get("listwebs", (result) => {
    if(typeof result.listwebs === "undefined") {
        chrome.storage.sync.set({"listwebs": websiteList});
        //chrome.storage.sync.set({"startorstop": "true"});
    }
  });


// adds manifest access to the extension
chrome.manifest = chrome.runtime.getManifest();


// for when the extension is first installed (from https://developer.chrome.com/docs/extensions/reference/tabs/)
chrome.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: "options.html"
    });
  }
  // context menus: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Context_menu_items
  var contextMenuMain = {
      "id": "addWebsite",
      "title": "Add Website",
      "contexts": ["all"] 
  }
  var contextMenuCoding = {
    "id":"coding",
    "parentId": "addWebsite",   
    "title": "Add to 'Coding'",
    "contexts": ["all"], //find a context that applies to taking the url of a webpage
    
  }
  var contextMenuSchool = {
    "id":"school",
    "parentId": "addWebsite",   
    "title": "Add to 'School'",
    "contexts": ["all"], //find a context that applies to taking the url of a webpage
    
  }

   // adds that context menu
  chrome.contextMenus.create(contextMenuMain);
  chrome.contextMenus.create(contextMenuCoding);
  chrome.contextMenus.create(contextMenuSchool);

  
});

// event listerner for when clicked on context menus
chrome.contextMenus.onClicked.addListener((event) => {
    if (event.menuItemId == "coding") {
        // run function
        addsCodeSite();

        //notification
        var added = {
          title: "Website Added",
          message: "This Webpage has been sucessfully added to your blocking list",
          iconUrl: "48.png",
          type: "basic"
        }
        chrome.notifications.create("addWebNotif", added, () => {});
      
    } else if (event.menuItemId == "school") {
        // run function
        addsSchoolSite(); 

        //notification
        var added = {
          title: "Website Added",
          message: "This Webpage has been sucessfully added to your blocking list",
          iconUrl: "48.png",
          type: "basic"
        }
        chrome.notifications.create("addWebNotif", added, () => {});
    };
});



// for the context menu button --> adds object to list of coding folder
function addsCodeSite() {
    var hasDuplicates = false;
    // accessing chrome tabs api
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
      }, function(tabs) {
        // accesses urls
        var tab = tabs[0];
        holdURL = tab.url;
        
        if (typeof tab.url != null) {
            chrome.storage.sync.get("listwebs", (result) => {
                // storing value from chrome storage
                var websiteList = result.listwebs;
                // check for possible duplicates
                var exitLoop = true;
                for (i = 0; i < websiteList.length && exitLoop; i++) {
                    if (websiteList[i].title == String(tab.title) && websiteList[i].url == String(tab.url) && websiteList[i].type == "coding") {
                        // don't add website (boolean toggle)
                        hasDuplicates = true;
                        exitLoop = false;
                    } 
                }
                if (!hasDuplicates) {
                    // object
                    var coding = {};
                    coding.title = String(tab.title);
                    coding.url = String(tab.url);
                    coding.type = "coding";
                    // adding object to list
                    websiteList.push(coding);
                    // updating chrome storage with the new list
                    chrome.storage.sync.set({"listwebs": websiteList});
                }

              });
          console.log("test" + tab.url) // gives tab url
          console.log(tab.title)  // gives tab title 
        } else {
            console.log("failed to add website");
        }
      });
}

// for the context menu button --> adds object to list of school folder
function addsSchoolSite() {
    var hasDuplicates = false;
    // accessing chrome tabs api
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
      }, function(tabs) {
        // accesses urls
        var tab = tabs[0];
        holdURL = tab.url;
        
        if (typeof tab.url != null) {
            chrome.storage.sync.get("listwebs", (result) => {
                // storing value from chrome storage
                var websiteList = result.listwebs;
                // check for possible duplicates
                var exitLoop = true;
                for (i = 0; i < websiteList.length && exitLoop; i++) {
                    if (websiteList[i].title == String(tab.title) && websiteList[i].url == String(tab.url) && websiteList[i].type == "school") {
                        // don't add website (boolean toggle)
                        hasDuplicates = true;
                        exitLoop = false;
                    } 
                }
                if (!hasDuplicates) {
                    // object
                    var school = {};
                    school.title = String(tab.title);
                    school.url = String(tab.url);
                    school.type = "school";
                    // adding object to list
                    websiteList.push(school);
                    // updating chrome storage with the new list
                    chrome.storage.sync.set({"listwebs": websiteList});
                }

              });
          console.log("test" + tab.url) // gives tab url
          console.log(tab.title)  // gives tab title 
        } else {
            console.log("failed to add website");
        }
      });
}




// returns url of current page with console.log (testing)
function test() {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
      }, function(tabs) {
        var tab = tabs[0];
        holdURL = tab.url;
        
        if (typeof tab.url != null) {
          
          console.log("test" + tab.url) // gives tab url
          console.log(tab.title)  // gives tab title 
        } else {
            console.log("failed");
        }
      });
    
}

/*

// to add functionality use an onClicked for when the contextMenu option part is clicked
function addWebsite(num) {
    if (num == 1) { 
      chrome.storage.sync.get("listwebs", (value) => {
        
        websiteList = value.list;
        
        chrome.tabs.query({
          active: true,
          lastFocusedWindow: true
        }, function(tabs) {
          var tab = tabs[0];
          holdURL = tab.url;
          
          if (typeof tab.url != null) {
            websiteList.push(tab.url);
            console.log(tab.url + "     onActivated");
            tabit = tab.id;
            chrome.storage.sync.set({"listwebs": websiteList});
          }
        });
        
        
        
        //notification
        var added = {
          title: "Website Added",
          message: "This Webpage has been sucessfully added to [insert folder name]",
          iconUrl: "48.png",
          type: "basic"
        }
        chrome.notifications.create("addWebNotif", added, () => {});
      });
    }
    
}

*/




// ------------------------------------------------------------->>>>>>


