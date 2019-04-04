/* global $,api,STORE ,bookMarks*/
'use strict';
const bookMarks = (function(){
 
  
  
  function generateDefultHeader(){
    return  `
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
    
  function generateEditNewHeader(){
    return `<form action="bookMark" role="form">
        <label for="book-title">Create New Bookmark</label><br>
        <input type="text" name="title" id="book-title" placeholder="facebook">
        <input type="text" name="url" id="book-title" placeholder="https://www.facebook.com/"><br>
        <input type="text" name="description" id="book-title" placeholder="description">
     <div class="star-create-rating">
          <input type="radio" name="create-rating" value="1" class="star-create-rating" checked><label for="create-rating">1</label>
          <input type="radio" name="create-rating" value="2" class="star-create-rating"><label for="create-rating">2</label>
          <input type="radio" name="create-rating" value="3" class="star-create-rating"><label for="create-rating">3</label>
          <input type="radio" name="create-rating" value="4" class="star-create-rating"><label for="create-rating">4</label>
          <input type="radio" name="create-rating" value="5" class="star-create-rating"><label for="create-rating">5</label>
      </div>
      <button class="add-sumbit-button" type="submit">Add Bookmark</button>
      <button class="cancel-button" type="button">Cancel</button>
   </form>`;
  }
  // generateStarRating();
  function generateDefultbookmark(){
    return `<li>
    <h2>Title</h2>
    <div class="star-rating">
        <input type="radio" name="rating" value="1" class="star-rating" checked><label for="rating">1</label>
        <input type="radio" name="rating" value="2" class="star-rating"><label for="rating">2</label>
        <input type="radio" name="rating" value="3" class="star-rating"><label for="rating">3</label>
        <input type="radio" name="rating" value="4" class="star-rating"><label for="rating">4</label>
        <input type="radio" name="rating" value="5" class="star-rating"><label for="rating">5</label>
    </div>
    <button class="remove-bookmark">Delete</button>
</li>`;
  }

  function generateExpandedBookmark(){
    return `<li>
      <h2>Title</h2>
      <div class="list-expanded">
          <p>Discription</p>
          <a href="link">Visit website</a>
          <div class="star-expanded-rating">
              <input type="radio" name="expanded-rating" value="1" class="star-expanded-rating" checked><label for="expanded-rating">1</label>
              <input type="radio" name="expanded-rating" value="2" class="star-expanded-rating"><label for="expanded-rating">2</label>
              <input type="radio" name="expanded-rating" value="3" class="star-expanded-rating"><label for="expanded-rating">3</label>
              <input type="radio" name="expanded-rating" value="4" class="star-expanded-rating"><label for="expanded-rating">4</label>
              <input type="radio" name="expanded-rating" value="5" class="star-expanded-rating"><label for="expanded-rating">5</label>
          </div>
          <button class="remove-bookmark">remove</button>
      </div>
  </li>`;
  }
    
  // handleAddBookmarkSubmit();
  // handleAddItem();
  // handleDeleteItem();
  // handleStarEditing();
  // handleRatingFilter();
  const render = function(){
    let head = (STORE.adding) ? generateEditNewHeader() : generateDefultHeader();
    let bookmarks = (STORE.ratingFilter === 'all') ? STORE.booklist : STORE.booklist.filter(obj => obj.rating >= STORE.ratingFilter);
    let bookmarkList = bookmarks.map(bookie =>{
      if(bookie.expanded){
        return generateExpandedBookmark();
      }else{
        return generateDefultbookmark();
      }
    });
    $('.main-default-container').html(head);
    $('.bookmark-list').html(bookmarkList);
  };
  return{ 
    render
  };
}());