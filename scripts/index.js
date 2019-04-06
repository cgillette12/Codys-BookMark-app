'use strict';
/* global $,api,STORE , bookMarks*/
$(function(){
  api.getItems()
    .then(response => response.forEach(bookmark => {
      bookmark.expanded = false;
      STORE.addBookmark(bookmark);
      bookMarks.render();
    })
    );
  bookMarks.render();
  bookMarks.mainHandleControler();
});