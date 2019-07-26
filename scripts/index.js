'use strict';
/* global $,api,STORE , bookMarks*/
$(function(){
  api.getItems()
    .then(response => response.forEach(bookmark => {
      bookmark.expanded = false;
      STORE.addBookmark(bookmark);
      bookMarks.render();
    })
    ).catch(err => {
      return $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
  bookMarks.render();
  bookMarks.mainHandleControler();
});