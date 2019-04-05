'use strict';
/* global $,api,*/

const STORE = (function(){
  const addBookmark = function(bookmark){
    this.push(bookmark);
  };

  const toggleAddForDisplayed = function(){
    this.addingBookmark = !this.addingBookmark;
  };
  
  

  return {
    booklist:[
      {rating:'all',expanded: true}
    ],
    addingBookmark:false,
    ratingFilter: 'all',

    addBookmark,
    toggleAddForDisplayed
  };
  
}());