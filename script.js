// Script.js

// Get DOM elements
const urlInput = document.getElementById("url");
const titleInput = document.getElementById("title");
const addBookmarkButton = document.getElementById("addBookmark");
const deleteAllButton = document.getElementById("deleteAll");
const bookmarkList = document.getElementById("bookmarkList");

// Function to validate URLs
function isValidURL(url) {
  const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
  return pattern.test(url);
}

// Event listener for adding a bookmark
addBookmarkButton.addEventListener("click", () => {
  const url = urlInput.value.trim();
  const title = titleInput.value.trim();
  if (isValidURL(url)) {
    const bookmarkItem = document.createElement("li");
    bookmarkItem.classList.add("list-group-item");
    bookmarkItem.innerHTML = `
            <div class="mb-1 d-flex flex-row buttons">  
                <a href="${url}" taret="_blank">${title}</a> 
                <div class="col-4 ms-auto">
                    <button class="btn btn-primary edit me-3"g>Edit</button> 
                    <button class="btn btn-danger delete">Delete</button> 
                 </div>
             </div>`;
    bookmarkList.appendChild(bookmarkItem);
    urlInput.value = "";
    addEditBookmarkListener(bookmarkItem);
    addDeleteBookmarkListener(bookmarkItem);
  } else {
    alert("Please enter a valid URL (http:// or https://).");
  }
});

// Event listener for deleting all bookmarks
deleteAllButton.addEventListener("click", () => {
  while (bookmarkList.firstChild) {
    bookmarkList.removeChild(bookmarkList.firstChild);
  }
});

// Event listener for editing bookmarks
function addEditBookmarkListener(bookmarkItem) {
  const editButton = bookmarkItem.querySelector(".edit");
  const bookmarkLink = bookmarkItem.querySelector("a");

  editButton.addEventListener("click", () => {
    const newURL = prompt("Edit the URL:", bookmarkLink.getAttribute("href"));

    const newTitle = prompt("Edit the Title:", bookmarkLink.textContent);
    if (newURL && isValidURL(newURL)) {
      bookmarkLink.setAttribute("href", newURL);
      bookmarkLink.innerHTML = newURL;
      bookmarkLink.textContent = newTitle;
    } else if (newURL) {
      alert("Please enter a valid URL (http:// or https://).");
    }
  });
}

// Event listener for deleting a bookmark
function addDeleteBookmarkListener(bookmarkItem) {
  const deleteButton = bookmarkItem.querySelector(".delete");
  deleteButton.addEventListener("click", () => {
    bookmarkItem.remove();
  });
}
