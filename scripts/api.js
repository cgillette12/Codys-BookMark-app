'use strict';
/* global*/

const api = (function (){
  const base_Url = 'https://thinkful-list-api.herokuapp.com/cody/bookmarks';
  const getItems = function(){
    return fetch(base_Url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
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
  const updatItem = function(id,bookmark){
    let update = JSON.stringify(bookmark);
    return fetch(`${base_Url}/${id}`,{
      method :'PATCH',
      headers:{'Content-Type':'application/json'},
      body:update
    });
  };
  const deleteItem = function(id){
    return fetch(`${base_Url}/${id}`,{
      method:'DELETE'
    });

  };
  return{
    getItems,
    createItem,
    updatItem,
    deleteItem
  };
}());