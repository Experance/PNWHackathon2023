// object "templates"
var coding = { title: "", url: "", type: "coding" };
var school = { title: "", url: "", type: "school" };
var socialmedia = { title: "", url: "", type: "socialmedia" };
var entertainment = { title: "", url: "", type: "entertainment" };
var miscellaneous = { title: "", url: "", type: "miscellaneous" };

var websiteList = [];

// adds an array into the storage
chrome.storage.sync.get("listwebs", (result) => {
  if (typeof result.listwebs === "undefined") {
    chrome.storage.sync.set({ "listwebs": websiteList });
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
  /*
  var contextMenuMain = {
      "id": "addWebsite",
      "title": "Add Website",
      "contexts": ["all"] 
  }
  */



  var addCoding = {
    "id": "addcoding",
    // "parentId": "addWebsite",   
    "title": "Add to 'Coding'",
    "contexts": ["all"],

  }
  var addSchool = {
    "id": "addschool",
    // "parentId": "addWebsite",   
    "title": "Add to 'School'",
    "contexts": ["all"],
  }
  var addSocialMedia = {
    "id": "addsocialmedia",
    // "parentId": "addWebsite",   
    "title": "Add to 'Social Media'",
    "contexts": ["all"],
  }
  var addEntertainment = {
    "id": "addentertainment",
    // "parentId": "addWebsite",   
    "title": "Add to 'Entertainment'",
    "contexts": ["all"],
  }
  var addMiscellaneous = {
    "id": "addmiscellaneous",
    // "parentId": "addWebsite",   
    "title": "Add to 'Miscellaneous'",
    "contexts": ["all"],
  }
  var separator = {
    "id": "separator-2",
    "type": "separator",
    "contexts": ["all"]
  };
  var removeCoding = {
    "id": "removecoding",
    // "parentId": "addWebsite",   
    "title": "Remove from 'Coding'",
    "contexts": ["all"],
    "enabled": false,

  }
  var removeSchool = {
    "id": "removeschool",
    // "parentId": "addWebsite",   
    "title": "Remove from 'School'",
    "contexts": ["all"],
    "enabled": false,
  }
  var removeSocialMedia = {
    "id": "removesocialmedia",
    // "parentId": "addWebsite",   
    "title": "Remove from 'Social Media'",
    "contexts": ["all"],
  }
  var removeEntertainment = {
    "id": "removeentertainment",
    // "parentId": "addWebsite",   
    "title": "Remove from 'Entertainment'",
    "contexts": ["all"],
  }
  var removeMiscellaneous = {
    "id": "removemiscellaneous",
    // "parentId": "addWebsite",   
    "title": "Remove from 'Miscellaneous'",
    "contexts": ["all"],
  }


  // adds that context menu
  //   chrome.contextMenus.create(contextMenuMain);
  chrome.contextMenus.create(addCoding);
  chrome.contextMenus.create(addSchool);
  chrome.contextMenus.create(addSocialMedia);
  chrome.contextMenus.create(addEntertainment);
  chrome.contextMenus.create(addMiscellaneous);
  chrome.contextMenus.create(separator);
  chrome.contextMenus.create(removeCoding);
  chrome.contextMenus.create(removeSchool);
  chrome.contextMenus.create(removeSocialMedia);
  chrome.contextMenus.create(removeEntertainment);
  chrome.contextMenus.create(removeMiscellaneous);

});


// get id and url when a page is first loading/when you move to a pre-loaded tab, 
// then calls the function 
chrome.tabs.onActivated.addListener((event) => {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function (tabs) {
    var tab = tabs[0];
    holdURL = tab.url;
    console.log(tab.url + "     onActivated");
    tabit = event.tabId;

    checkForNeededContextMenu(tab);
  });




});

// get id and url when a page is reloaded, or when the url is changed, 
// then calls the function 
chrome.tabs.onUpdated.addListener((tabsid, changeInfo, tab) => {
  console.log(changeInfo.status);
  if (changeInfo.hasOwnProperty("status") && typeof changeInfo.status === 'undefined') {
    changeInfo.status = 'loading';
  }

  if (String(changeInfo.status) == "undefined") {

    console.log(changeInfo.status + " updated")
    var tempId = tabsid;
    holdURL = tab.url;
    console.log(tab.url + "     onUpdated");

    checkForNeededContextMenu(tab);

    // fires onupdated by doing this action ()
    var updateInfo = {
      "muted": false,
    }
    chrome.tabs.update(
      tab.id,
      updateInfo,
    );

  }
  console.log("left the loop for onupdated" + changeInfo.status)


});


// checks for needed context menus and disables/enables accordingly 
function checkForNeededContextMenu(tab) {

  chrome.storage.sync.get("listwebs", (result) => {
    // storing value from chrome storage
    var websiteList = result.listwebs;

    // base case (nothing added)
    if (websiteList.length == 0) {
      // define objects with change for context menus

      var addCoding = {
        // "parentId": "addWebsite",   
        "enabled": true,
      }
      var removeCoding = {
        // "parentId": "addWebsite",   
        "enabled": false,

      }

      var addSchool = {

        "enabled": true,
      }
      var removeSchool = {

        "enabled": false,
      }


      var addSocialMedia = {
        "enabled": true,
      }
      var removeSocialMedia = {

        "enabled": false,
      }

      var addEntertainment = {
        "enabled": true,
      }
      var removeEntertainment = {

        "enabled": false,
      }

      var addMiscellaneous = {
        "enabled": true,
      }
      var removeMiscellaneous = {

        "enabled": false,
      }


      // update context menus

      chrome.contextMenus.update(
        "addschool",
        addSchool,
      );

      chrome.contextMenus.update(
        "removeschool",
        removeSchool,
      );

      chrome.contextMenus.update(
        "addcoding",
        addCoding,

      );
      chrome.contextMenus.update(
        "removecoding",
        removeCoding,

      );

      chrome.contextMenus.update(
        "addsocialmedia",
        addSocialMedia,

      );
      chrome.contextMenus.update(
        "removesocialmedia",
        removeSocialMedia,

      );

      chrome.contextMenus.update(
        "addentertainment",
        addEntertainment,

      );
      chrome.contextMenus.update(
        "removeentertainment",
        removeEntertainment,

      );

      chrome.contextMenus.update(
        "addmiscellaneous",
        addMiscellaneous,

      );
      chrome.contextMenus.update(
        "removemiscellaneous",
        removeMiscellaneous,

      );
    } else {


      // loop through the list of websites
      var hasCoding = false;
      var hasSchool = false;
      var hasSocialMedia = false;
      var hasEntertainment = false;
      var hasMiscellaneous = false;
      for (i = 0; i < websiteList.length; i++) {

        // ----------------------->> for when this website is added


        // if this website is in the coding folder
        if (websiteList[i].title == String(tab.title) && websiteList[i].url == String(tab.url) && websiteList[i].type == "coding") {
          //
          // update context menus (disables adding menu)
          var addCoding = {
            // "parentId": "addWebsite",   
            "enabled": false,
          }
          var removeCoding = {
            // "parentId": "addWebsite",   
            "enabled": true,

          }

          chrome.contextMenus.update(
            "addcoding",
            addCoding,

          );
          chrome.contextMenus.update(
            "removecoding",
            removeCoding,

          );

          hasCoding = true;

          console.log("hasCoding ===== true")
          // if this website is in the school folder
        } else if (websiteList[i].title == String(tab.title) && websiteList[i].url == String(tab.url) && websiteList[i].type == "school") {

          //exitLoop = false;
          // update context menus (disables adding menu)
          var addSchool = {

            "enabled": false,
          }
          var removeSchool = {

            "enabled": true,
          }
          chrome.contextMenus.update(
            "addschool",
            addSchool,
          );
          chrome.contextMenus.update(
            "removeschool",
            removeSchool,
          );

          hasSchool = true;
          console.log("hasSchool ===== true")
        } else if (websiteList[i].title == String(tab.title) && websiteList[i].url == String(tab.url) && websiteList[i].type == "socialmedia") {

          //exitLoop = false;
          // update context menus (disables adding menu)
          var addSocialMedia = {

            "enabled": false,
          }
          var removeSocialMedia = {

            "enabled": true,
          }
          chrome.contextMenus.update(
            "addsocialmedia",
            addSocialMedia,
          );
          chrome.contextMenus.update(
            "removesocialmedia",
            removeSocialMedia,
          );

          hasSocialMedia = true;
          console.log("hasSchool ===== true")
        } else if (websiteList[i].title == String(tab.title) && websiteList[i].url == String(tab.url) && websiteList[i].type == "entertainment") {

          //exitLoop = false;
          // update context menus (disables adding menu)
          var addEntertainment = {

            "enabled": false,
          }
          var removeEntertainment = {

            "enabled": true,
          }
          chrome.contextMenus.update(
            "addentertainment",
            addEntertainment,
          );
          chrome.contextMenus.update(
            "removeentertainment",
            removeEntertainment,
          );

          hasEntertainment = true;
          console.log("hasSchool ===== true")
        } else if (websiteList[i].title == String(tab.title) && websiteList[i].url == String(tab.url) && websiteList[i].type == "miscellaneous") {

          //exitLoop = false;
          // update context menus (disables adding menu)
          var addMiscellaneous = {

            "enabled": false,
          }
          var removeMiscellaneous = {

            "enabled": true,
          }
          chrome.contextMenus.update(
            "addmiscellaneous",
            addMiscellaneous,
          );
          chrome.contextMenus.update(
            "removemiscellaneous",
            removeMiscellaneous,
          );

          hasMiscellaneous = true;
          console.log("hasSchool ===== true")
        }





      }

      // --------------------------->> for when website isn't added


      if (!hasSchool) {
        
        // for when this website isn't added into the school folder
        console.log("school  idkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        var addSchool = {

          "enabled": true,
        }
        var removeSchool = {

          "enabled": false,
        }
        chrome.contextMenus.update(
          "addschool",
          addSchool,
        );
        chrome.contextMenus.update(
          "removeschool",
          removeSchool,
        );
      } 
      if (!hasCoding) {
        console.log("coding  idkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        // for when this website isn't added into the coding folder
        var addCoding = {
          // "parentId": "addWebsite",   
          "enabled": true,
        }
        var removeCoding = {
          // "parentId": "addWebsite",   
          "enabled": false,

        }

        chrome.contextMenus.update(
          "addcoding",
          addCoding,

        );
        chrome.contextMenus.update(
          "removecoding",
          removeCoding,

        );
      } 
      if (!hasSocialMedia) {
        console.log("coding  idkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        // for when this website isn't added into the social media folder
        var addSocialMedia = {

          "enabled": true,
        }
        var removeSocialMedia = {

          "enabled": false,
        }
        chrome.contextMenus.update(
          "addsocialmedia",
          addSocialMedia,
        );
        chrome.contextMenus.update(
          "removesocialmedia",
          removeSocialMedia,
        );

      } 
      if (!hasEntertainment) {
        console.log("coding  idkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        // for when this website isn't added into the entertainment folder
        var addEntertainment = {

          "enabled": true,
        }
        var removeEntertainment = {

          "enabled": false,
        }
        chrome.contextMenus.update(
          "addentertainment",
          addEntertainment,
        );
        chrome.contextMenus.update(
          "removeentertainment",
          removeEntertainment,
        );

      } 
      if (!hasMiscellaneous) {
        console.log("coding  idkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        // for when this website isn't added into the entertainment folder
        var addMiscellaneous = {

          "enabled": true,
        }
        var removeMiscellaneous = {

          "enabled": false,
        }
        chrome.contextMenus.update(
          "addmiscellaneous",
          addMiscellaneous,
        );
        chrome.contextMenus.update(
          "removemiscellaneous",
          removeMiscellaneous,
        );


      }






    }

  });
}









// event listerner for when clicked on context menus
chrome.contextMenus.onClicked.addListener((event, tab) => {
  console.log("event.menuItemId = " + event.menuItemId);
  if (event.menuItemId == "addcoding") {
    // run function
    addsSite("coding");
    console.log(tab);
    // disables/enables needed context menus accordingly

    checkForNeededContextMenu(tab);

    // //notification
    // var added = {
    //   title: "Website Added",
    //   message: "This Webpage has been sucessfully added to your blocking list",
    //   iconUrl: "48.png",
    //   type: "basic"
    // }
    // chrome.notifications.create("addWebNotif", added, () => {});

  } else if (event.menuItemId == "addschool") {
    // run function
    addsSite("school");
    // disables/enables needed context menus accordingly
    checkForNeededContextMenu(tab);

    // //notification
    // var added = {
    //   title: "Website Added",
    //   message: "This Webpage has been sucessfully added to your blocking list",
    //   iconUrl: "48.png",
    //   type: "basic"
    // }
    // chrome.notifications.create("addWebNotif", added, () => {});
  } else if (event.menuItemId == "addsocialmedia") {
    // run function
    addsSite("socialmedia");
    // disables/enables needed context menus accordingly
    checkForNeededContextMenu(tab);

    // //notification
    // var added = {
    //   title: "Website Added",
    //   message: "This Webpage has been sucessfully added to your blocking list",
    //   iconUrl: "48.png",
    //   type: "basic"
    // }
    // chrome.notifications.create("addWebNotif", added, () => {});
  } else if (event.menuItemId == "addentertainment") {
    // run function
    addsSite("entertainment");
    // disables/enables needed context menus accordingly
    checkForNeededContextMenu(tab);

    // //notification
    // var added = {
    //   title: "Website Added",
    //   message: "This Webpage has been sucessfully added to your blocking list",
    //   iconUrl: "48.png",
    //   type: "basic"
    // }
    // chrome.notifications.create("addWebNotif", added, () => {});
  } else if (event.menuItemId == "addmiscellaneous") {
    // run function
    addsSite("miscellaneous");
    // disables/enables needed context menus accordingly
    checkForNeededContextMenu(tab);

    // //notification
    // var added = {
    //   title: "Website Added",
    //   message: "This Webpage has been sucessfully added to your blocking list",
    //   iconUrl: "48.png",
    //   type: "basic"
    // }
    // chrome.notifications.create("addWebNotif", added, () => {});
  } else if (event.menuItemId == "removecoding") {
    // run function
    removesSite("coding");
    // disables/enables needed context menus accordingly
    checkForNeededContextMenu(tab);

    // //notification
    // var added = {
    //   title: "Website Removed",
    //   message: "This Webpage has been sucessfully removed from your blocking list",
    //   iconUrl: "48.png",
    //   type: "basic"
    // }
    // chrome.notifications.create("addWebNotif", added, () => {});
  } else if (event.menuItemId == "removeschool") {
    // run function
    removesSite("school");
    // disables/enables needed context menus accordingly
    checkForNeededContextMenu(tab);

    // //notification
    // var added = {
    //   title: "Website Removed",
    //   message: "This Webpage has been sucessfully removed from to your blocking list",
    //   iconUrl: "48.png",
    //   type: "basic"
    // }
    // chrome.notifications.create("addWebNotif", added, () => {});
  } else if (event.menuItemId == "removesocialmedia") {
    // run function
    removesSite("socialmedia");
    // disables/enables needed context menus accordingly
    checkForNeededContextMenu(tab);

    // //notification
    // var added = {
    //   title: "Website Removed",
    //   message: "This Webpage has been sucessfully removed from to your blocking list",
    //   iconUrl: "48.png",
    //   type: "basic"
    // }
    // chrome.notifications.create("addWebNotif", added, () => {});
  } else if (event.menuItemId == "removeentertainment") {
    // run function
    removesSite("entertainment");
    // disables/enables needed context menus accordingly
    checkForNeededContextMenu(tab);

    // //notification
    // var added = {
    //   title: "Website Removed",
    //   message: "This Webpage has been sucessfully removed from to your blocking list",
    //   iconUrl: "48.png",
    //   type: "basic"
    // }
    // chrome.notifications.create("addWebNotif", added, () => {});
  } else if (event.menuItemId == "removemiscellaneous") {
    // run function
    removesSite("miscellaneous");
    // disables/enables needed context menus accordingly
    checkForNeededContextMenu(tab);

    // //notification
    // var added = {
    //   title: "Website Removed",
    //   message: "This Webpage has been sucessfully removed from to your blocking list",
    //   iconUrl: "48.png",
    //   type: "basic"
    // }
    // chrome.notifications.create("addWebNotif", added, () => {});
  };
  checkForNeededContextMenu(tab);
  // fires onupdated by doing this action
  var updateInfo = {
    "muted": true,
  }
  chrome.tabs.update(
    tab.id,
    updateInfo,
  );
});



// for the context menu button --> adds object to list of coding folder
function addsSite(type) {
  var hasDuplicates = false;
  // accessing chrome tabs api
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function (tabs) {
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
          if (websiteList[i].title == String(tab.title) && websiteList[i].url == String(tab.url) && websiteList[i].type == String(type)) {
            // don't add website (boolean toggle)
            hasDuplicates = true;
            exitLoop = false;
          }
        }
        if (!hasDuplicates) {
          // object
          var object = {};
          object.title = String(tab.title);
          object.url = String(tab.url);
          object.type = String(type);
          // adding object to list
          websiteList.push(object);
          // updating chrome storage with the new list
          chrome.storage.sync.set({ "listwebs": websiteList });
        }

      });
      console.log("test" + tab.url) // gives tab url
      console.log(tab.title)  // gives tab title 
    } else {
      console.log("failed to add website");
    }
  });
}


// removes a site of given type
function removesSite(type) {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function (tabs) {
    var tab = tabs[0];
    holdURL = tab.url;

    if (typeof tab.url != null) {
      chrome.storage.sync.get("listwebs", (result) => {
        // storing value from chrome storage
        var websiteList = result.listwebs;
        // check for possible duplicates & remove
        var exitLoop = true;
        for (i = 0; i < websiteList.length && exitLoop; i++) {
          if (websiteList[i].title == String(tab.title) && websiteList[i].url == String(tab.url) && websiteList[i].type == String(type)) {
            // remove website (at index i)
            websiteList.splice(i, 1);
            // updating chrome storage with the new list
            chrome.storage.sync.set({ "listwebs": websiteList });
            exitLoop = false;
          }
        }
      });
      console.log("test" + tab.url) // gives tab url
      console.log(tab.title)  // gives tab title 
    } else {
      console.log("failed");
    }
  });
}


// returns url of current page with console.log (testing)
function test() {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function (tabs) {
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
