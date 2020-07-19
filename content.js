chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.greeting === "fetch_current_url" ) {
        var url = document.URL;
  
      //alert("i fetched");
        chrome.runtime.sendMessage({"greeting": "save_current_url", "url": url});
      }
    }
  );