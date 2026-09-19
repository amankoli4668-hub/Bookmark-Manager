const addBookmarkForm = document.querySelector('.add-bookmark-form');
const websiteTitle = document.querySelector('#websiteTitle');
const websiteUrl = document.querySelector('#websiteUrl');
const category = document.querySelector('#category');
const bookmarksList = document.querySelector('#bookmarksList');
const filterBtns = document.querySelectorAll('.filter-btn');

let bookmarks = [];
let currentView = "All";

// To Prevent default behavior of Form submit. And add new Bookmark.
addBookmarkForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const newBookmark = {
            id: Date.now(),
            title: websiteTitle.value,
            url: websiteUrl.value,
            category: category.value
        }
        websiteTitle.value = "";
        websiteUrl.value = "";
        category.value = DEFAULT_SETTING.defaultCategory;
        bookmarks.push(newBookmark);
        saveData();
        filterview();
});

// To render the bookmark array.
function renderBookmarks(Array){
    bookmarksList.innerHTML = "";
    Array.forEach((bookmark)=>{
        const bookmarkItem = document.createElement('div');
        bookmarkItem.classList.add("bookmark-item");
        
        const bookmarkInfo = document.createElement('div');
        bookmarkInfo.classList.add("bookmark-info");
        const h3 = document.createElement('h3');
        h3.innerText = bookmark.title;
        bookmarkInfo.append(h3);
        
        const bookmarkLink = document.createElement('a');
        bookmarkLink.classList.add("bookmark-link");
        bookmarkLink.setAttribute("href", bookmark.url);
        bookmarkLink.innerText = bookmark.url;
        bookmarkInfo.append(bookmarkLink);
        
        const bookmarkCategory = document.createElement('span');
        bookmarkCategory.classList.add("bookmark-category");
        bookmarkCategory.innerText = bookmark.category;
        bookmarkInfo.append(bookmarkCategory);

        const button = document.createElement('button');
        button.innerText = "Delete";
        button.addEventListener('click', ()=>{
            deleteBookmark(bookmark.id);
        })

        bookmarkItem.append(bookmarkInfo);
        bookmarkItem.append(button);
        

        bookmarksList.append(bookmarkItem);
    });

}

// To use filter btns and show filter view.
function filterview(){
    if(currentView == "All"){
        renderBookmarks(bookmarks);
    } else {
        let filterBookmark = bookmarks.filter((bookmark)=>{
            return bookmark.category == currentView;
        });
        renderBookmarks(filterBookmark);
    }
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(bn => bn.classList.remove("active"));
        btn.classList.add("active");
        currentView = btn.dataset.category;
        filterview();
    })
});

// To delete a perticular Bookmark.
function deleteBookmark(id){
    bookmarks = bookmarks.filter(bookmark => bookmark.id != id);
    saveData();
    filterview();
}

// Default Setting of Bookmark and Unchangeble.
const DEFAULT_SETTING = Object.freeze({
    storageKey: "bookmarkData",
    categories: ["Work", "Study", "Entertainment"],
    defaultCategory: "Work"
});

// To save the data of Bookmark Array.
function saveData(){
    localStorage.setItem(DEFAULT_SETTING.storageKey, JSON.stringify(bookmarks));
}

// To load the data into Bookmark array after refresh.
function loadData(){
    Data = localStorage.getItem(DEFAULT_SETTING.storageKey);
    if(Data){
        bookmarks = JSON.parse(Data);
    }
}

function init(){
    loadData();
    filterview();
} 
init();