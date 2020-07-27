document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("#getAllBookmarks").addEventListener('click', openBookmarkFunction);
    document.querySelector("#addBookmarks").addEventListener('click', fetchCurrentUrl);

    // Add listener for "Enter" for our search-box.
    document.getElementById('omnibox').addEventListener('keyup', searchForTag);

});

function openBookmarkFunction() {
    // Use settings here ?
    console.log("open button");
    chrome.tabs.create({
        "url": "https://callstack.com/blog/say-goodbye-to-old-fashioned-forks-thanks-to-the-patch-package/"
    });
}

function fetchCurrentUrl() {
    chrome.runtime.sendMessage({
        "greeting": "from_popup_to_fetch_url"
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "save_current_url_from_background") {
            document.querySelector("#resultsContainer").innerHTML = request.url;
        }
    }
);

function searchForTag(event) {
    if (event.code !== "Enter")
        return;
    // Fired only on enter-press
    var result = event.target.value;
}
