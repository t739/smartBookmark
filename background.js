function connect() {
    chrome.tabs.query({
            active: true,
            currentWindow: true
        },
        function(tab) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, {
                    "greeting": "fetch_current_url"
                });
            });
        });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "from_popup_to_open_bookmark") {
            chrome.tabs.create({
                "url": request.url
            });
        } else if (request.greeting === "from_popup_to_fetch_url") {
            connect();
        } else if (request.greeting === "save_current_url") {
            chrome.runtime.sendMessage({
                "greeting": "save_current_url_from_background",
                "url": request.url,
                "title": request.title
            });
        }
    }
);
