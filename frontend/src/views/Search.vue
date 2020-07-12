<template src="../templates/Search.vue"></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import '../css/search.scss';

const BOOKS_PER_PAGE = 50;

const groupBy = (xs, key, childKey) => {
  let id = 0;
  return xs.reduce((acc, x) => {
    let currentItemIndex = acc.findIndex(
      item => item.name === x[key],
    );
    currentItemIndex =
      currentItemIndex > -1 ? currentItemIndex : acc.length;

    const currentItem = acc[currentItemIndex] || {
      name: x[key],
      id: id++,
      children: [],
    };
    x.id = id++;
    x.name = x[childKey];
    currentItem.children.push(x);
    acc[currentItemIndex] = currentItem;
    return acc;
  }, []);
};

@Component({
  name: 'Search',
  components: {},
})
export default class Search extends Vue {
  private drawer = false;

  private totalBooksCount = 0;
  private currentPage = 1;
  private totalVisible = BOOKS_PER_PAGE;

  private searchBooks = '';
  private search = '';

  private currentlyLoading = {};
  private allBooks = [];
  private authorBooks = [];
  private tree = [];
  private items = [];
  private open = [];

  get pagedAuthorBooks() {
    return this.authorBooks.slice(
      (this.currentPage - 1) * this.totalVisible,
      this.currentPage * this.totalVisible,
    );
  }

  async downloadFile(type, title, id) {
    this.currentlyLoading = {
      ...this.currentlyLoading,
      [`${id}${type}`]: 1,
    };
    this.$forceUpdate();

    const blob = await fetch(
      `${this.SERVER_URL}/flibusta/download/${id}/${type}`,
    ).then(x => x.blob());

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title}.${type}`);
    document.body.appendChild(link);
    link.click();

    this.currentlyLoading = {
      ...this.currentlyLoading,
      [`${id}${type}`]: 0,
    };
    this.$forceUpdate();
  }

  async searchBooksStart(type) {
    if (this.searchBooks.length < 5) {
      alert('Set at least 5 symbols please');
      return;
    }
    const allBooks = await fetch(
      `${this.SERVER_URL}/flibusta/search/${type}/${this.searchBooks}`,
    ).then(x => x.json());
    console.log('allbooks', allBooks);

    this.allBooks = allBooks.map(book => {
      const authorInfo = book.libavtorname_models[0];

      book.AuthorName = authorInfo
        ? `${authorInfo.LastName} ${authorInfo.FirstName}`
        : 'Unknown author';
      book.authorId = authorInfo?.AvtorId || 0;

      const tmp = document.createElement('DIV');
      tmp.innerHTML =
        book.libbannotations_model?.Body || 'No description';
      book.Desc = tmp.textContent || tmp.innerText || '';
      return book;
    });
    this.totalBooksCount = Math.ceil(
      this.allBooks.length / BOOKS_PER_PAGE,
    );

    this.items = groupBy(this.allBooks, 'AuthorName', 'Title').sort(
      (a, b) => b.children.length - a.children.length,
    );
    console.log(this.items);

    localStorage.setItem('allBooks', JSON.stringify(this.allBooks));
    localStorage.setItem('items', JSON.stringify(this.items));
    localStorage.setItem(
      'totalBooksCount',
      JSON.stringify(this.totalBooksCount),
    );
    localStorage.setItem(
      'searchBooks',
      JSON.stringify(this.searchBooks),
    );
  }

  setActiveAuthor(item) {
    this.authorBooks = item.children;
    localStorage.setItem(
      'authorBooks',
      JSON.stringify(this.authorBooks),
    );
  }

  mounted() {
    try {
      this.allBooks =
        JSON.parse(localStorage.getItem('allBooks')) || [];
      this.authorBooks =
        JSON.parse(localStorage.getItem('authorBooks')) || [];

      this.items = JSON.parse(localStorage.getItem('items')) || [];
      this.totalBooksCount =
        JSON.parse(localStorage.getItem('totalBooksCount')) || 0;
      this.searchBooks =
        JSON.parse(localStorage.getItem('searchBooks')) || '';
    } catch (ex) {
      console.error('Wrong data in localstorage', ex);
    }
  }
}
</script>
