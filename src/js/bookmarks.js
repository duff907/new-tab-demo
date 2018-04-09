const bookmarkContainer = document.getElementById('bookmark-container');

const createBookmark = (bookmark) => {
  var oDiv = document.createElement("a");
  oDiv.setAttribute("class", "bookmark");
  oDiv.setAttribute("href", bookmark.url);
  var oImg = document.createElement("img");
  var oSpan = document.createElement("span");
  oSpan.textContent = bookmark.title;
  oImg.setAttribute('src', `chrome://favicon/${bookmark.url}`);
  oDiv.appendChild(oImg);
  oDiv.appendChild(oSpan);
  bookmarkContainer.appendChild(oDiv);
}

const createBookmarks = () => {
  chrome.bookmarks.getSubTree('1', (res) => {
    const bookmarks = res[0].children;
    for (const bookmark in bookmarks) {
      if (bookmarks.hasOwnProperty(bookmark)) {
        createBookmark(bookmarks[bookmark])
      }
    }
  });
}

export default createBookmarks;