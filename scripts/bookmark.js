/* global $,api,store*/
'use strict';
const bookMarks = (function(){
 
  
  
  function generateDefultHeader(){
    return  `<div class="main-container">
        <div class="button-controler">
          <button>Add Bookmarks</button>
          <select name="rating-filter">
              <option value="all">all</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select>
        </div>`;
    
  }
  //   function generateDefultHeadertoString(header){
  //     const list = header.map((item) => generateDefultHeader(item));
  //     return list.join('');
  //   }
    
  // generateAddItemHeader();
  // generateStarRating();
  // generateDefultItem();
    
  // handleAddBookmarkSubmit();
  // handleAddItem();
  // handleDeleteItem();
  // handleStarEditing();
  // handleRatingFilter();
  //   const render = function(){
  //     $('.main-container').html(generateDefultHeader());
  //   };
  return{ 
    // render
  };
}());