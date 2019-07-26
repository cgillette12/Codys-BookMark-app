/* global $,api,STORE, cuid,bookMarks*/
'use strict';
const bookMarks = (function () {
  function generateDefultHeader() {
    return `
        <div class="button-controler">
          <button class="add-bookmark">Add Bookmarks</button>
          <select  class="rating-filter">
              <option value="all${(STORE.ratingFilter === 'all') ? 'selected' : ''}">all</option>
              <option value="1${(STORE.ratingFilter === '1') ? 'selected' : ''}">1</option>
              <option value="2${(STORE.ratingFilter === '2') ? 'selected' : ''}">2</option>
              <option value="3${(STORE.ratingFilter === '3') ? 'selected' : ''}">3</option>
              <option value="4${(STORE.ratingFilter === '4') ? 'selected' : ''}">4</option>
              <option value="5${(STORE.ratingFilter === '5') ? 'selected' : ''}">5</option>
          </select>
        </div>`;

  }

  function generateNewHeader() {
    return `<form class="formEditor" role="form">
        <div class='editor-header'>
          <h2>Create New Bookmark</h2>
        </div>
        <section class='header-input-section'>
          <div class='input-spacer'>
            <label for="Title" class='title-label'>Title</label>
            <input type="input-text" name="title" id="title" placeholder="facebook" required/>
          </div>
          <div class='input-spacer'>
            <label for="Url" class='Url-label'>Url *"url must be min length 5 and begin http(s)://</label>
            <input type="intput-text" name="url" id="url" placeholder="https://www.facebook.com/"required/>
          </div>
          <div class='input-spacer'>
            <label for="Description" class='Description-label'>Description</label>
            <input type="input-text" name="description" id="description" placeholder="Description"/>
          </div>
        </section>
     <div class="star-create-rating">
          <div class='radio-spacer'>
            <input type="radio" name="create-rating" value="1" class="star-create-rating" checked/>
            <label for="create-rating">1</label>
          </div>
          <div class='radio-spacer'>
            <input type="radio" name="create-rating" value="2" class="star-create-rating"/>
            <label for="create-rating">2</label>
          </div>
          <div class='radio-spacer'>
            <input type="radio" name="create-rating" value="3" class="star-create-rating"/>
            <label for="create-rating">3</label>
          </div>
          <div class='radio-spacer'>
            <input type="radio" name="create-rating" value="4" class="star-create-rating"/>
            <label for="create-rating">4</label>
          </div>
          <div class='radio-spacer'>
            <input type="radio" name="create-rating" value="5" class="star-create-rating"/>
            <label for="create-rating">5</label>
          </div>
      </div>
      <section class='Editor-button-section'>
        <button class="add-bookmark-42" type="submit">Add Bookmark</button>
        <button class="cancel-edit-button" type="button">Cancel</button>
      </section>
   </form>`;
  }

  function generateStarRating(rating) {
    const fullStar = '&#9733;';
    const hollowStar = '&#9734;';
    const numberFilledStars = fullStar.repeat(rating);
    const numberHollowStars = hollowStar.repeat(5 - rating);
    return numberFilledStars + numberHollowStars;

  }
  function generateDefultbookmark(booklist) {
    return `<li class="book-item" data-item-id="${booklist.id}">
    <section class='bookmark-header'>
        <h2>${booklist.title}</h2>
    </section>
    <div class="star-rating">
        <p class='ration'>${generateStarRating(booklist.rating)}
    </div>
    <div class='bookmark-button-div'>
          <button class="edit-bookmark">Edit</button>
          <button class="remove-bookmark">Remove</button>
    </div>
</li>`;
  }

  function generateExpandedBookmark(booklist) {
    return `<li class="book-item" data-item-id="${booklist.id}">
      <section class='bookmark-header'>
        <h2>${booklist.title}</h2>
      </section>
      <div class="bookmark-info">
          <p>${booklist.desc}</p>
          <div class="star-expanded-rating">
            <p class='ration'>${generateStarRating(booklist.rating)}
          </div>
            <a href="${booklist.url}">Visit website</a>
          <section class='bookmark-button-section'>
            <button class="edit-bookmark">Edit</button>
            <button class="remove-bookmark">remove</button>
          </section>
      </div>
  </li>`;
  }

  function generateEditorForBookmarks(booklist) {
    return `<li class="book-item" data-item-id="${booklist.id}">
        <form class="edit-form">
        <h2>${booklist.title}</h2>
             <label for="Description">Description</label>
            <input type="input-text" class="desc${booklist.id}" value="${booklist.desc === '' ? 'No Description' : booklist.desc}"/>
            <div class="star-expanded-rating">
              <input type="radio" name="edit-rating${booklist.id}" class="rating" value="1"${(booklist.rating === 1) ? 'checked' : ''}><label for="edit-rating">1</lable>
              <input type="radio" name="edit-rating${booklist.id}" class="rating" value="2"${(booklist.rating === 2) ? 'checked' : ''}><label for="edit-rating">2</lable>
              <input type="radio" name="edit-rating${booklist.id}" class="rating" value="3"${(booklist.rating === 3) ? 'checked' : ''}><label for="edit-rating">3</lable>
              <input type="radio" name="edit-rating${booklist.id}" class="rating" value="4"${(booklist.rating === 4) ? 'checked' : ''}><label for="edit-rating">4</lable>
              <input type="radio" name="edit-rating${booklist.id}" class="rating" value="5"${(booklist.rating === 5) ? 'checked' : ''}><label for="edit-rating">5</lable>
            </div>
            <a href="${booklist.url}">Visit website</a>
            <section class='bookmark-button-section'>
              <button class="save-bookmark" type="submit" >Save</button>
              <button class="cancel-bookmark">cancel</button> 
            </section>

        </form>
  </li>`;
  }

  const render = function () {
    let head = (STORE.addingBookmark) ? generateNewHeader() : generateDefultHeader();
    let bookmarks = (STORE.ratingFilter === 'all') ? STORE.booklist : STORE.booklist.filter(obj => obj.rating >= STORE.ratingFilter);
    let bookmarkList = bookmarks.map(bookmark => {
      if (bookmark.expanded === true) {
        if (bookmark.edit === true) {
          return generateEditorForBookmarks(bookmark);
        } else {
          return generateExpandedBookmark(bookmark);
        }
      } else {
        return generateDefultbookmark(bookmark);
      }
    });
    // console.log(bookmarkList);

    $('.main-default-container').html(head);
    $('.bookmark-list').html(bookmarkList);
  };

  function handleShowAddBookmarkForm() {
    $('.main-default-container').on('click', '.add-bookmark', function () {
      STORE.toggleAddForDisplayed();
      render();
    });
  }

  function handleCancelForm() {
    $('.main-default-container').on('click', '.cancel-edit-button', function () {
      STORE.toggleAddForDisplayed();
      render();
    });
  }

  function handleAddBookmarkSubmit() {
    $('.main-default-container').on('submit', function (event) {
      event.preventDefault();
      const newTitle = $('#title').val();
      const newUrl = $('#url').val();
      const newDescription = $('#description').val();
      const newRating = $('input[name=create-rating]:checked').val();
      let newobj = {
        id: cuid(),
        title: newTitle,
        url: newUrl,
        desc: newDescription,
        rating: parseInt(newRating),
        expanded: false,
        edit: false
      };
      api.createItem({ title: newTitle, url: newUrl, desc: newDescription, rating: parseInt(newRating) })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(res.statusText);
        })
        .then(data => data)
        .catch(err => {
          return $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
      
      STORE.addBookmark(newobj);
      STORE.toggleAddForDisplayed();
      render();
    });


  }
  function collectEditData(id) {
    const description = $(`.desc${id}`).val();
    const rating = $(`input[name=edit-rating${id}]:checked`).val();
    return { desc: description, rating: Number(rating) };
  }

  function handleEditFormBookmark() {
    $('.bookmark-list').on('click', '.edit-bookmark', function (event) {
      let itemId = findTargetId(event.currentTarget);
      let bookmark = STORE.booklist.find(bookobj => itemId === bookobj.id);
      if (!bookmark.expanded && !bookmark.edit){
        STORE.toggleExpandBookmark(itemId);
        STORE.toggleEdit(itemId);
        render();
      } else if (bookmark.expanded && !bookmark.edit){
        STORE.toggleEdit(itemId);
        render();
      }
      else {
        STORE.toggleExpandBookmark(itemId);
        STORE.toggleEdit(itemId);
        render();
      }
    });
  }
  function handleCanceledit() {
    $('.bookmark-list').on('click', '.cancel-bookmark', function (event) {
      let itemId = findTargetId(event.currentTarget);
      STORE.toggleExpandBookmark(itemId);
      STORE.toggleEdit(itemId);
      render();
    });
  }
  const handleSubmitEdit = function () {
    $('.bookmark-list').on('click', '.save-bookmark', function (event) {
      event.preventDefault();
      const bookmarkId = findTargetId(event.currentTarget);
      const booklist = collectEditData(bookmarkId);
      api.updatItem(bookmarkId,booklist)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(res.statusText);
        })
        .then(data => data)
        .catch(err => {
          return $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
      STORE.updateBookmark(bookmarkId, booklist);
      STORE.toggleExpandBookmark(bookmarkId);
      STORE.toggleEdit(bookmarkId);
      render();

    });
  };
  function findTargetId(item) {
    return $(item)
      .closest('.book-item')
      .attr('data-item-id');
  }
  function handleToggleExpandBookmark() {
    $('.bookmark-list').on('click', '.bookmark-header', function (event) {
      let itemId = findTargetId(event.currentTarget);
      let bookmark = STORE.booklist.find(bookobj => itemId === bookobj.id);
      if (!bookmark.expanded) {
        STORE.toggleExpandBookmark(itemId);
        render();
      } else {
        STORE.toggleExpandBookmark(itemId);
        render();
      }
    });
  }
  function handleDeleteItem() {
    $('.bookmark-list').on('click', '.remove-bookmark', function (event) {
      let itemId = findTargetId(event.target);
      api.deleteItem(itemId)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(res.statusText);
        })
        .then(data => data)
        .catch(err => {
          return $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
      STORE.removeItemFromBookmark(itemId);
      render();
    });
  }
  function handleBookmarkFilter() {
    $('.main-default-container').on('change', '.rating-filter', function () {
      const changedFilterValue = $('.rating-filter').val();
      STORE.toggleRatingFilter(changedFilterValue);
      render();
    });
  }

  const mainHandleControler = (function () {
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

  return {
    render,
    mainHandleControler
  };
}());