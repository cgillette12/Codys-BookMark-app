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
    const target = this.booklist.find(bookmarkObj=> bookmarkObj.id === id);
    target.expanded = !target.expanded;
    
  };
  const removeItemFromBookmark = function(bookmark){
    let bookfilter= this.booklist.filter(obj => obj.id !== bookmark);
    this.booklist.splice(bookfilter, 1);
  };
  
  

  return {
    booklist:[
      
    ],
    addingBookmark:false,
    ratingFilter: 'all',
    addBookmark,
    toggleAddForDisplayed,
    toggleExpandBookmark,
    removeItemFromBookmark

  };
  
}());