'use strict';
/* global $,api,*/

const STORE = (function(){
  const addBookmark = function(bookmark){
    this.push(bookmark);
  };

  const toggleAddForDisplayed = function(){
    this.adding = !this.adding;
  }
;
  return {
    booklist:[
      {rating:'all',expanded: false}
    ],
    adding:false,
    ratingFilter: 'all',

    addBookmark,
    toggleAddForDisplayed
  };
  
}());