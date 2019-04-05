'use strict';
/* global $,api,cuid*/

const STORE = (function(){
  const addBookmark = function(bookmark){
    this.booklist.push(bookmark);
  };

  const toggleAddForDisplayed = function(){
    this.addingBookmark = !this.addingBookmark;
  };
  
  const toggleExpandBookmark= function(id){
    const target = this.booklist.find(bookmarkId => id = bookmarkId.id);
    target.expanded = !target.expanded;
  };
  
  

  return {
    booklist:[
      {id:cuid(),title:'facebook',url:'https://www.facebook.com/',rating:'all', expanded: false, editer:false}
    ],
    addingBookmark:false,
    ratingFilter: 'all',
    addBookmark,
    toggleAddForDisplayed,
    toggleExpandBookmark,
  };
  
}());