/* global $,api,STORE, cuid, bookMarks*/
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
        <label for="book-title">Create New Bookmark</label><br>
        <input type="input-text" name="title" id="title" placeholder="facebook" required>
        <input type="intput-text" name="url" id="url" placeholder="https://www.facebook.com/"required><br>
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