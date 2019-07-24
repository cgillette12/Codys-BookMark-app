/* global $,api,STORE, cuid, bookMarks*/
'use strict';
const bookMarks = (function(){
 
  function generateStarRating(rating){
    const fullStar = '&#9733;';
    const hollowStar= '&#9734;'; 
    const numberFilledStars = fullStar.repeat(rating);
    const numberHollowStars = hollowStar.repeat(5 - rating);
    return numberFilledStars + numberHollowStars;

  }
  function generateDefultbookmark(booklist){
    return `<li class="book-item" id="${booklist.id}">
    <h2>${booklist.title}</h2>
    <div class="star-rating">
        <p class='ration'>${generateStarRating(booklist.rating)}
    </div>
    <button class="edit-bookmark">Edit</button>
    <button class="remove-bookmark">Delete</button>
</li>`;
  }

  function generateExpandedBookmark(booklist){
    return `<li class="book-item" id="${booklist.id}">
      <h2>${booklist.title}</h2>
      <div class="star-rating">
          <p>${booklist.desc}</p>
          <div class="star-expanded-rating">
          <p class='ration'>${generateStarRating(booklist.rating)}
          </div>
          <p><a href="${booklist.url}">Visit website</a></p><br>
          <button class="edit-bookmark">Edit</button>
          <button class="remove-bookmark">remove</button>
      </div>
  </li>`;
  }

  function generateEditorForBookmarks(booklist){
    console.log(booklist);
    return `<li class="book-item" data-item-id="${booklist.id}">
        <form class="edit-form">
        <h2>${booklist.title}</h2>
                <input type="input-text" class="desc${booklist.id}" value="${booklist.desc === ''?'No Description':booklist.description}"</p>
            <div class="star-expanded-rating">
              <input type="radio" name="edit-rating${booklist.id}" class="rating" value="1"${(booklist.rating === 1) ? 'checked': ''}><label for="edit-rating">1</lable>
              <input type="radio" name="edit-rating${booklist.id}" class="rating" value="2"${(booklist.rating === 2) ? 'checked': ''}><label for="edit-rating">2</lable>
              <input type="radio" name="edit-rating${booklist.id}" class="rating" value="3"${(booklist.rating === 3) ? 'checked': ''}><label for="edit-rating">3</lable>
              <input type="radio" name="edit-rating${booklist.id}" class="rating" value="4"${(booklist.rating === 4) ? 'checked': ''}><label for="edit-rating">4</lable>
              <input type="radio" name="edit-rating${booklist.id}" class="rating" value="5"${(booklist.rating === 5) ? 'checked': ''}><label for="edit-rating">5</lable>
            </div>
            <p><a href="${booklist.url}">Visit website</a></p>
            <button class="save-bookmark" type="submit" >Save</button>
            <button class="cancel-bookmark">cancel</button>
        
        </form>
  </li>`;
  }
    
  const render = function(){
    let head = (STORE.addingBookmark) ? generateNewHeader() : generateDefultHeader();
    let bookmarks = (STORE.ratingFilter === 'all') ? STORE.booklist : STORE.booklist.filter(obj => obj.rating >= STORE.ratingFilter);
    let bookmarkList = bookmarks.map(bookie =>{
      if(bookie.expanded){
        if(bookie.edit){
          console.log(bookie.edit);
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
  console.log(STORE.booklist);
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
        desc:newDescription,
        rating:parseInt(newRating),
        expanded: false, 
        edit:false
      };
      api.createItem({title:newTitle,url:newUrl,desc:newDescription,rating:parseInt(newRating)});
      STORE.addBookmark(newobj);
      STORE.toggleAddForDisplayed();
      render();
    });
    
      
  }
  function collectEditData(id){
    const description =$(`.desc${id}`).val();
    const rating = $(`input[name=edit-rating${id}]:checked` ).val();
    return {desc:description, rating: Number(rating)};
  }

  function handleEditFormBookmark(){
    $('.bookmark-list').on('click','.edit-bookmark',function(event){
      let itemId = findTargetId(event.currentTarget);
      let bookmark = STORE.booklist.find(bookobj => itemId === bookobj.id);

      if(!bookmark.edit){
        const bookmarkData = collectEditData(itemId);
        api.updatItem(itemId,bookmarkData);
        STORE.updateBookmark(itemId,bookmarkData);
        STORE.toggleEdit(itemId);
        STORE.toggleExpandBookmark(itemId);
        render();
      }else{
        STORE.toggleEdit(itemId);
        render();
      }
    });
  }
  function handleCanceledit(){
    $('.bookmark-list').on('click','.cancel-bookmark',function(event){
      let itemId = findTargetId(event.currentTarget);
      STORE.toggleExpandBookmark(itemId);
      render();
    });
  }
  const handleSubmitEdit = function(){
    $('.bookmark-list').on('click','.save-bookmark', function(event){
      event.preventDefault();
      const bookmarkId = findTargetId(event.currentTarget);
      const booklist = collectEditData(bookmarkId);
      STORE.updateBookmark(bookmarkId,booklist);
      
    
    });
  };
  function findTargetId(item){
    return $(item)
      .closest('.book-item')
      .attr('data-item-id');
  }
  function handleToggleExpandBookmark(){
    $('.bookmark-list').on('click','h2',function(event){
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
      api.deleteItem(itemId);
      STORE.removeItemFromBookmark(itemId);
      render();
    });
  }
  function handleBookmarkFilter(){
    $('.main-default-container').on('change','.rating-filter',function(){
      const changedFilterValue = $('.rating-filter').val();
      STORE.toggleRatingFilter(changedFilterValue);
      render();
    });
  }
  

  const mainHandleControler= (function(){
    handleShowAddBookmarkForm();
    handleCancelForm();
    handleAddBookmarkSubmit();
    handleToggleExpandBookmark();
    handleDeleteItem();
    handleBookmarkFilter();
    handleEditFormBookmark();
    handleSubmitEdit();
    handleCanceledit();
    
    
  });

  return{ 
    render,
    mainHandleControler
  };
}());