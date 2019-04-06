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
    let bookfilter = this.booklist.filter(obj => obj.id !== bookmark);
    this.booklist.splice(bookfilter, 1);
  };
  
  const toggleRatingFilter = function(rating){
    this.ratingFilter = rating === 'all' ? rating : parseInt(rating);
  };
  
  const toggleEdit = function(id){
    let bookfilter = this.booklist.find(obj=> obj.id === id);
    bookfilter.edit = !bookfilter.edit;
  };
  const updateBookmark = function(id, updatedBookmark){
    const targetedBookmark = this.booklist.find(obj => obj.id === id);
    console.log(targetedBookmark);
    Object.assign(targetedBookmark, updatedBookmark);

  };
  

  return {
    booklist:[
      
    ],
    addingBookmark:false,
    ratingFilter: 'all',
    addBookmark,
    toggleAddForDisplayed,
    toggleExpandBookmark,
    removeItemFromBookmark,
    toggleRatingFilter,
    toggleEdit,
    updateBookmark

  };
  
}());