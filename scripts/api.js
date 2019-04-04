'use strict';
/* global $,api,STORE */

const api = (function (){
  const base_Url = 'https://thinkful-list-api.herokuapp.com/cody/bookmarks';
  const getItems = function(){
    fetch(base_Url);
    return Promise.resolve('A successful response!');
  };
  const createItem = function(title,url,des,rating){
    let bookmark ={
      title,
      url,
      des,
      rating
    };
    let newItem = JSON.stringify(bookmark);
    return fetch(base_Url,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: newItem
    });
    

  };
  //   const updatItem = function(){
  //   PATCH
  // }
  // const deleteItem = function(){
  //     DELETE
  // }
  return{
    getItems,
    createItem
  //     updatItem,
  //     deleteItem,
  };
}());