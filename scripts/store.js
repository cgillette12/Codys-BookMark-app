'use strict';
/* global $,api,*/

const STORE = (function(){
  const addBookmark = function(bookmark){
    this.booklist.push(bookmark);
  };

  const toggleAddForDisplayed = function(){
    this.addingBookmark = !this.addingBookmark;
  };
  
  const toggleExpandBookmark= function(id){
    const target = this.booklist.find(items => items.id === id);
    target.expanded = !target.expanded;
  };
  
  

  return {
    booklist:[
      {rating:'all',expanded: true}
    ],
    addingBookmark:false,
    ratingFilter: 'all',

    addBookmark,
    toggleAddForDisplayed,
    toggleExpandBookmark,
  };
  
}());