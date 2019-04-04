'use strict';
/* global $,api,STORE , bookMarks*/
$(function(){
  bookMarks.render;
  api.getItems()
    .then(res => console.log(res));
  
  console.log(api.BASE_URL);
});