var hourOfDay = new Date().getHours();

const getGreeting = () => {
  switch (true) {
    case hourOfDay < 11:
      return 'Good Morning';
      break;
    case hourOfDay < 17:
      return 'Good Afternoon';
      break;
    default:
      return 'Good Evening';
      break;
  }
}

const getDate = () => {
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
  let dateObj = {};
  dateObj.day = new Date().getDate();
  dateObj.ordinal = nth(new Date().getDate());
  dateObj.month = months[new Date().getMonth()];
  dateObj.year = new Date().getFullYear();
  return dateObj;
};

function nth(d) {
  if(d>3 && d<21) return 'th'; // thanks kennebec
  switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
} 

document.getElementsByClassName('greeting')[0].innerHTML = getGreeting();

let date = getDate();
document.getElementsByClassName('day')[0].innerHTML = date.day;
document.getElementsByClassName('ordinal')[0].innerHTML = date.ordinal;
document.getElementsByClassName('month')[0].innerHTML = date.month;
document.getElementsByClassName('year')[0].innerHTML = date.year;


const updateTime = () => {
  document.getElementsByClassName('time')[0].innerHTML = new Date().toLocaleTimeString("en-GB");
}

updateTime();
window.setInterval(updateTime, 1000);

const bookmarkContainer = document.getElementById('bookmark-container');

const createBookmark = (bookmark) => {
  console.log(bookmark)
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

chrome.bookmarks.getSubTree('1', (res) => {
  const bookmarks = res[0].children;
  for (const bookmark in bookmarks) {
    if (bookmarks.hasOwnProperty(bookmark)) {
      createBookmark(bookmarks[bookmark])
    }
  }
});

console.log(document.getElementById("add-new-list"));

document.getElementById("add-new-list").addEventListener('click', (e) => {
  e.preventDefault();
  console.log('test');
  const toDoList = document.getElementsByClassName('to-do-list')[0];

  document.getElementsByClassName('three-col')[0].appendChild(toDoList.cloneNode(true));
  return false;
});