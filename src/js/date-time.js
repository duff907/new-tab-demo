const getGreeting = () => {
  var hourOfDay = new Date().getHours();

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


const updateTime = () => {
  document.getElementsByClassName('time')[0].innerHTML = new Date().toLocaleTimeString("en-GB");
}

var setupDateTime = () => {
  updateTime();
  window.setInterval(updateTime, 1000);
  
  document.getElementsByClassName('greeting')[0].innerHTML = getGreeting();

  let date = getDate();
  document.getElementsByClassName('day')[0].innerHTML = date.day;
  document.getElementsByClassName('ordinal')[0].innerHTML = date.ordinal;
  document.getElementsByClassName('month')[0].innerHTML = date.month;
  document.getElementsByClassName('year')[0].innerHTML = date.year;
}

export default setupDateTime;