import React from 'react';
import { render } from 'react-dom';
import DateTimeAndGreeting from './date-time';
import CreateBookmarks from './bookmarks';
import Lists from './lists';

DateTimeAndGreeting();
CreateBookmarks();

render(<Lists />, document.getElementById('lists'));

// document.getElementById("add-new-list").addEventListener('click', (e) => {
//   e.preventDefault();
//   const toDoList = document.getElementsByClassName('to-do-list')[0];

//   document.getElementsByClassName('three-col')[0].appendChild(toDoList.cloneNode(true));
//   return false;
// });