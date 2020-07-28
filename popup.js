document.addEventListener('DOMContentLoaded', setListenerForSearch);

let BookmarkList = [{
    title: 'Conquering the Command Line',
    url: 'http://conqueringthecommandline.com/book/extras',
    notes: 'Basics of UNIX(like) cmd-line',
    tagList: ['shell', 'ag', 'UNIX']
}, ];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "save_current_url_from_background") {
            document.getElementById("omnibox").value = request.title;

            // set callback when saving
            var newBookmark = {};
            newBookmark["url"] = request.url;
            newBookmark["title"] = request.title;
            BookmarkList.push(newBookmark);
        }
    }
);

function setListenerForSearch() {
    document.querySelector(".getAllBookmarks").addEventListener('click', openBookmark);
    document.querySelector(".addBookmarks").addEventListener('click', addCurrentURL);
    document.getElementById('omnibox').addEventListener('keyup', searchForTag);
}

function clearSearchListener() {
    document.querySelector(".getAllBookmarks").removeEventListener('click', openBookmark);
    document.querySelector(".addBookmarks").removeEventListener('click', addCurrentURL);
    document.getElementById('omnibox').removeEventListener('keyup', searchForTag);
}

function setListenerForBookmark() {
    document.querySelector(".getAllBookmarks").addEventListener('click', saveBookmark);
    document.querySelector(".addBookmarks").addEventListener('click', goToSearchView);
}

function clearBookmarkListener() {
    document.querySelector(".getAllBookmarks").removeEventListener('click', saveBookmark);
    document.querySelector(".addBookmarks").removeEventListener('click', goToSearchView);
}

function goToSearchView() {
    // Clear results container, Show results container.
    let resultsContainer = document.querySelector('.resultsContainer');
    while (resultsContainer.lastChild) {
        resultsContainer.removeChild(resultsContainer.lastChild);
    }
    resultsContainer.style.display = "block";

    // Clear input-text field
    document.getElementById("omnibox").value = "";

    // Add correct listeners
    clearBookmarkListener();

    // Remove notes input-text
    let omniboxContainer = document.querySelector('.omniboxContainer');

    // Just leave first 2 elements in the conatiner : |omnibox| and |br|
    while (omniboxContainer.childElementCount > 2) {
        omniboxContainer.removeChild(omniboxContainer.lastChild);
    }

    setListenerForSearch();

    // Change button-texts
    toggleToBookmarkButtons();
}

function saveBookmark() {
    let newBookmark = BookmarkList.pop();
    newBookmark["title"] = document.getElementById("omnibox").value;
    newBookmark["notes"] = document.getElementById("notesBox").value;
    // "tag1 tag2 tag3 ..." => ["tag1", "tag2", "tag3", ...]
    newBookmark['tagList'] = document.getElementById('tagsBox').value.split(" ");
    BookmarkList.push(newBookmark);

    //Optionally just go-back to start page :
    goToSearchView();
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
    //Request for data
    fetchCurrentUrl();

    // Hide results container.
    document.querySelector('.resultsContainer').style.display = "none";

    // Clear input-text field
    document.getElementById("omnibox").value = "";

    // Show notes input-text
    let notesInput = document.createElement("input");
    let tagInput = document.createElement("input");

    tagInput.type = "text";
    notesInput.type = "text";

    notesInput.id = "notesBox";
    tagInput.id = "tagsBox";

    let omniboxContainer = document.querySelector('.omniboxContainer');

    omniboxContainer.appendChild(document.createElement("br"));
    omniboxContainer.appendChild(notesInput);

    omniboxContainer.appendChild(document.createElement("br"));
    omniboxContainer.appendChild(document.createElement("br"));

    omniboxContainer.appendChild(tagInput);

    // Add correct listeners
    clearSearchListener();
    setListenerForBookmark();

    // Change button-texts
    toggleToBookmarkButtons();
}

function fetchCurrentUrl() {
    chrome.runtime.sendMessage({
        "greeting": "from_popup_to_fetch_url"
    });

}

function getBookmarksForSearch(query) {
    let resultList = BookmarkList;
    // Process query
    return resultList;
}

function showResultForBookmark(bookmark) {
    let img_url = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + bookmark['url'];

    let bookmark_card = document.createElement('user-card');
    bookmark_card.title = bookmark['title'];
    bookmark_card.avatar = img_url;

    let bookmark_slot = document.createElement("div");
    bookmark_slot.slot = "notes";
    bookmark_slot.innerHTML = bookmark['notes'];

    bookmark_card.appendChild(bookmark_slot);

    // Add card to container.
    document.querySelector('.resultsContainer').appendChild(bookmark_card);
}

function searchForTag(event) {
    if (event.code !== "Enter")
        return;

    var result = event.target.value;

    // Clear Container
    let resultsContainer = document.querySelector('.resultsContainer');
    while (resultsContainer.lastChild) {
        resultsContainer.removeChild(resultsContainer.lastChild);
    }

    // getList of matching URL's
    let resultList = getBookmarksForSearch(result);

    //Show-our list for every member
    for (bookmark of resultList) {
        showResultForBookmark(bookmark);
    }

}
