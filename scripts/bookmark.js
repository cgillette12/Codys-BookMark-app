/* global $,api,STORE, cuid,bookMarks*/
'use strict';
const bookMarks = (function(){
 
  
  
  function generateDefultHeader(){
    return  `
        <div class="button-controler">
          <button class="add-bookmark">Add Bookmarks</button>
          <select  class="rating-filter">
              <option value="all"${STORE.ratingFilter === 'all' ? 'selected': ''}>all</option>
              <option value="1"${STORE.ratingFilter === '1' ? 'selected': ''}>1</option>
              <option value="2"${STORE.ratingFilter === '2' ? 'selected': ''}>2</option>
              <option value="3"${STORE.ratingFilter === '3' ? 'selected': ''}>3</option>
              <option value="4"${STORE.ratingFilter === '4' ? 'selected': ''}>4</option>
              <option value="5"${STORE.ratingFilter === '5' ? 'selected': ''}>5</option>
          </select>
        </div>`;
    
  }
    
  function generateNewHeader(){
    return `<form class="formEditor" role="form">
        <label for="book-title">Create New Bookmark</label><br>
        <input type="input-text" name="title" id="title" placeholder="facebook">
        <input type="intput-text" name="url" id="url" placeholder="https://www.facebook.com/"><br>
        <input type="input-text" name="description" id="description" placeholder="description">
     <div class="star-create-rating">
          <input type="radio" name="create-rating" value="1" class="star-create-rating" checked><label for="create-rating">1</label>
          <input type="radio" name="create-rating" value="2" class="star-create-rating"><label for="create-rating">2</label>
          <input type="radio" name="create-rating" value="3" class="star-create-rating"><label for="create-rating">3</label>
          <input type="radio" name="create-rating" value="4" class="star-create-rating"><label for="create-rating">4</label>
          <input type="radio" name="create-rating" value="5" class="star-create-rating"><label for="create-rating">5</label>
      </div>
      <button class="add-bookmark-42" type="submit">Add Bookmark</button>
      <button class="cancel-edit-button" type="button">Cancel</button>
   </form>`;
  }
  function generateStarRating(rating){
    const fullStar = '&#9733;';
    const hollowStar= '&#9734;'; 
    const numberFilledStars = fullStar.repeat(rating);
    const numberHollowStars = hollowStar.repeat(5 - rating);
    return numberFilledStars + numberHollowStars;

  }
  function generateDefultbookmark(booklist){
    return `<li class="book-item" data-item-id="${booklist.id}">
    <h2>${booklist.title}</h2>
    <div class="star-rating">
        <p class='ration'>${generateStarRating(booklist.rating)}
    </div>
    <button class="edit-bookmark">Edit</button>
    <button class="remove-bookmark">Delete</button>
</li>`;
  }

  function generateExpandedBookmark(booklist){
    return `<li class="book-item" data-item-id="${booklist.id}">
      <h2>${booklist.title}</h2>
      <div class="list-expanded">
          <p>${booklist.description}</p>
          <div class="star-expanded-rating">
          <p class='ration'>${generateStarRating(booklist.rating)}
          </div>
          <a href="${booklist.url}">Visit website</a>
          <button class="edit-bookmark">Edit</button>
          <button class="remove-bookmark">remove</button>
      </div>
  </li>`;
  }

  function generateEditorForBookmarks(booklist){
    return `<li class="book-item" data-item-id="${booklist.id}">
        <form class="edit-form">
            <input type="input-text" id=title${booklist.id} value=${booklist.title}>
            <div class="list-expanded">
                <input type="input-text" value="${booklist.description === ''?'No Description':booklist.description}"</p>
            <div class="star-expanded-rating">
              <input type="radio" name="edit-rating" id="rating${booklist.id}" value=" ${STORE.ratingFilter === '1' ? 'selected': ''}"><label for="edit-rating">1</lable>
              <input type="radio" name="edit-rating" id="rating${booklist.id}" value="${STORE.ratingFilter === '2' ? 'selected': ''}"><label for="edit-rating">2</lable>
              <input type="radio" name="edit-rating" id="rating${booklist.id}" value="${STORE.ratingFilter === '3' ? 'selected': ''}"><label for="edit-rating">3</lable>
              <input type="radio" name="edit-rating" id="rating${booklist.id}" value="${STORE.ratingFilter === '4' ? 'selected': ''}"><label for="edit-rating">4</lable>
              <input type="radio"name="edit-rating" id="rating${booklist.id}"  value="${STORE.ratingFilter === '5' ? 'selected': ''}"><label for="edit-rating">5</lable>
            </div>
        </form>
            <div class="link-n-delete-buttons>
            <p><a href="${booklist.url}">Visit website</a></p>
            <button class="save-bookmark">Save</button>
          <button class="cancel-bookmark">cancel</button>
      </div>
      </div>
  </li>`;
  }
    
  const render = function(){
    let head = (STORE.addingBookmark) ? generateNewHeader() : generateDefultHeader();
    let bookmarks = (STORE.ratingFilter === 'all') ? STORE.booklist : STORE.booklist.filter(obj => obj.rating >= STORE.ratingFilter);
    let bookmarkList = bookmarks.map(bookie =>{
      if(bookie.expanded){
        if(bookie.edit){
          return generateEditorForBookmarks(bookie);
        }else{
          return generateExpandedBookmark(bookie);
        }
      }else{
        return generateDefultbookmark(bookie);
      }
    });
    // console.log(bookmarkList);

    $('.main-default-container').html(head);
    $('.bookmark-list').html(bookmarkList);
  };

  function handleShowAddBookmarkForm(){
    $('.main-default-container').on('click','.add-bookmark',function(){
      STORE.toggleAddForDisplayed();
      render();
    });
  }

  function handleCancelForm(){
    $('.main-default-container').on('click','.cancel-edit-button',function(){
      STORE.toggleAddForDisplayed();
      render();
    });
  }

  function handleAddBookmarkSubmit(){
    $('.main-default-container').on('submit',function(event){
      event.preventDefault();
      const newTitle = $('#title').val(); 
      const newUrl = $('#url').val();
      const newDescription = $('#description').val();
      const newRating = $('input[name=create-rating]:checked').val();
      let newobj={
        id:cuid(),
        title:newTitle,
        url:newUrl,
        description:newDescription,
        rating:parseInt(newRating),
        expanded: false, 
        edit:false
      };
      STORE.addBookmark(newobj);
      STORE.toggleAddForDisplayed();
      render();
    });
    
      
  }
  function collectEditData(id){
    const title= $(`#title${id}`).val();
    const description =$(`#description${id}`).val();
    const rating = $(`input[name=edit-rating]:checked${id}` ).val();
    return {title,description,rating,expanded: false,edit:false};
  }

  function handleEditedBookmark(){
    $('.bookmark-list').on('click','.edit-bookmark',function(event){
      let itemId = findTargetId(event.currentTarget);
      let bookmark = STORE.booklist.find(bookobj => itemId === bookobj.id);
      if(bookmark.edit){

        STORE.toggleEdit(itemId);
        STORE.toggleExpandBookmark(itemId);
        render();
      }else{
        STORE.toggleEdit(itemId);
        render();
      }
    });
  }
  function findTargetId(item){
    return $(item)
      .closest('.book-item')
      .attr('data-item-id');
  }
  function handleToggleExpandBookmark(){
    $('.bookmark-list').on('click','.book-item',function(event){
      let itemId = findTargetId(event.currentTarget);
      let bookmark = STORE.booklist.find(bookobj => itemId === bookobj.id);
      if(!bookmark.edit){
        STORE.toggleExpandBookmark(itemId);
        render();
      }
    });
  }
  function handleDeleteItem(){
    $('.bookmark-list').on('click','.remove-bookmark',function(event){
      let itemId = findTargetId(event.target);
      STORE.removeItemFromBookmark(itemId);
      render();
    });
  }
  function handleBookmarkFilter(){
    $('.main-default-container').on('change','.rating-filter',function(event){
      console.log(event.target);
      const changedFilterValue = $('.rating-filter').val();
      STORE.toggleRatingFilter(changedFilterValue);
      render();
    });
  }
  function serializeJson(form) {
    const formData = new FormData(form);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }

  const mainHandleControler= (function(){
    handleShowAddBookmarkForm();
    handleCancelForm();
    handleAddBookmarkSubmit();
    handleToggleExpandBookmark();
    handleDeleteItem();
    handleBookmarkFilter();
    handleEditedBookmark();
    
  });

  return{ 
    render,
    mainHandleControler
  };
}());