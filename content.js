chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "fetch_current_url") {
            var url = document.URL;
            let pageTitle = document.title;
            chrome.runtime.sendMessage({
                "greeting": "save_current_url",
                "url": url,
                "title": pageTitle
            });
        }
    }
);
