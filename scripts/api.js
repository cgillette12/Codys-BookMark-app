'use strict';
/* global $,api,STORE */

const api = (function (){
  const base_Url = 'https://thinkful-list-api.herokuapp.com/cody/bookmarks';
  const getItems = function(){
    return fetch(base_Url)
      .then(res => res.json())
      .then(data => data);
  };
  const createItem = function(obj){
    let newItem = JSON.stringify(obj);
    return fetch(base_Url,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: newItem,
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