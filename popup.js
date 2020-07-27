document.addEventListener('DOMContentLoaded', setListenerForSearch);

function setListenerForSearch() {
    document.querySelector(".getAllBookmarks").addEventListener('click', openBookmark);
    document.querySelector(".addBookmarks").addEventListener('click', addCurrentURL);
    document.getElementById('omnibox').addEventListener('keyup', searchForTag);
    // alert("added for search");
}

function clearSearchListener() {
    document.querySelector(".getAllBookmarks").removeEventListener('click', openBookmark);
    document.querySelector(".addBookmarks").removeEventListener('click', addCurrentURL);
    document.getElementById('omnibox').removeEventListener('keyup', searchForTag);
    // alert("cleared for search");
}

function setListenerForBookmark() {
    document.querySelector(".getAllBookmarks").addEventListener('click', saveBookmark);
    document.querySelector(".addBookmarks").addEventListener('click', goToSearchView);
    // alert("Added For bookmarks");
}

function clearBookmarkListener() {
    document.querySelector(".getAllBookmarks").removeEventListener('click', saveBookmark);
    document.querySelector(".addBookmarks").removeEventListener('click', goToSearchView);
}

function goToSearchView() {
    alert("going back....")
}

function saveBookmark() {
    alert("saved");
}

function openBookmark() {
    console.log("open button");
    chrome.tabs.create({
        "url": "https://callstack.com/blog/say-goodbye-to-old-fashioned-forks-thanks-to-the-patch-package/"
    });
}

function toggleToBookmarkButtons() {
    let saveButton = document.querySelector('.getAllBookmarks');
    let addButton = document.querySelector('.addBookmarks');

    if (saveButton.innerHTML === "Save") {
        saveButton.innerHTML = "See All";
        addButton.innerHTML = "Add New";
        saveButton.style.backgroundColor = "#666";
        saveButton.style.color = "white";
    } else {
        saveButton.innerHTML = "Save";
        addButton.innerHTML = "Back";
        saveButton.style.backgroundColor = "#00dfff";
        saveButton.style.color = "black";
    }
}

function addCurrentURL() {
    // Hide results container.
    document.querySelector('.resultsContainer').style.display = "none";

    // Clear input-text field
    document.getElementById("omnibox").value = "";

    // Show notes input-text
    let notesInput = document.createElement("input");
    notesInput.type = "text";
    notesInput.id = "notesBox";

    let omniboxContainer = document.querySelector('.omniboxContainer');
    omniboxContainer.appendChild(document.createElement("br"));
    omniboxContainer.appendChild(notesInput);

    // GetCurrent url and Page title

    // Add correct listeners
    clearSearchListener();
    setListenerForBookmark();

    // Show page-title in editable omniboxContainer

    // Change button-texts
    toggleToBookmarkButtons();
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
    var result = event.target.value;
    alert(result);
}
