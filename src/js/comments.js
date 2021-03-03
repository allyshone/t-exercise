class Comments {
  constructor() {
    this.container = document.querySelector('.article__comments-list');
    if (this.hasDOMLoaded ) this.getCommentsData();
  }

  /**
	 * check if dom has loaded
	 * @return Boolean
	 */
  hasDOMLoaded() {
    return document.addEventListener('DOMContentLoaded', e => true);
  }

  /**
   * call fetch and set data
   */
  async getCommentsData() {
    this.commentsData = await this.getComments();

    if ( this.commentsData ) {
      this.appendCommentsNum();
      this.appendComments(this.commentsData);
    }
  }

  /**
   * fetch comments
   * @return Object
   */
  async getComments() {
    let data = null;

    await fetch('https://my-json-server.typicode.com/telegraph/frontend-exercise/comments')
      .then((response) => response.json())
      .then((response) => {
        if ( response.length ) {
          data = response;
        } else {
          console.error('no data');
        }
      })
      .catch((err) => {
        console.error('fetch error')
      });

    return data;
  }

  /**
   * append comments to dom
   */
  appendComments(data) {
    if (data.length) {
      data.forEach((comment) => {
        document.querySelector('.article__comments-list').insertAdjacentHTML('beforeend', this.commentHTMLMarkup(comment));
      });
    }
  }

  /**
   * append number of comments to dom
   */
  appendCommentsNum() {
    const commentsNumContainer = document.querySelector('.article__comments-num');

    if (this.commentsData.length) {
      commentsNumContainer.insertAdjacentHTML('beforeend', `<span>${this.commentsData.length} comments</span>`);
    }
  }

  /**
   * comment html markup
   */
  commentHTMLMarkup(comment) {
    return `
      <li id="${comment.id}" class="article__comments-list-item">
        <div class="item__header">
          <span class="user">${comment.name}</span>
          <span class="date">${comment.date}</span>
          <span class="likes">${comment.likes} likes</span>
        </div>
        <div class="item__content"><p>${comment.body}</p></div>
      </li>
    `;
  }

}

module.exports = Comments;