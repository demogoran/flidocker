<template>
  <div id="app">
    <v-btn to="/genres">Back</v-btn>
    <v-card class="mx-auto" tile>
      <v-card class="mx-auto" max-width="300" tile>
        <v-pagination
          v-model="currentPage"
          :circle="true"
          :disabled="false"
          :length="totalBooksCount"
          :next-icon="nextIcon"
          :prev-icon="prevIcon"
          :page="currentPage"
          :total-visible="totalVisible"
        ></v-pagination>
      </v-card>

      <v-card>
        <v-card-title>
          {{ genreName }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="genreBooks"
          item-key="BookId"
          sort-by="Title"
          group-by="AuthorName"
          class="elevation-1"
          show-group-by
          hide-default-footer
          :items-per-page="totalVisible"
          :search="search"
          :page.sync="currentPage"
          @page-count="pageCount = $event"
        >
          <template v-slot:group.header="{ group, toggle, isOpen }">
            <span>{{ group }}</span>
            <v-btn text icon small color="red" @click="toggle">
              <v-icon>{{
                isOpen ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'
              }}</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.Title="{ item }">
            <v-row no-gutters>
              <v-col>
                <router-link :to="`/read/${item.BookId}`">{{
                  item.Title
                }}</router-link>
              </v-col>
              <v-col>
                <div>
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    v-if="currentlyLoading[`${item.BookId}fb2`]"
                  ></v-progress-circular>
                  <v-icon
                    v-if="!currentlyLoading[`${item.BookId}fb2`]"
                    title="fb2"
                    @click="
                      () =>
                        downloadFile('fb2', item.Title, item.BookId)
                    "
                    >mdi-download</v-icon
                  >

                  <v-progress-circular
                    indeterminate
                    color="primary"
                    v-if="currentlyLoading[`${item.BookId}epub`]"
                  ></v-progress-circular>
                  <v-icon
                    v-if="!currentlyLoading[`${item.BookId}epub`]"
                    title="epub"
                    @click="
                      () =>
                        downloadFile('epub', item.Title, item.BookId)
                    "
                    >mdi-download</v-icon
                  >

                  <v-progress-circular
                    indeterminate
                    color="primary"
                    v-if="currentlyLoading[`${item.BookId}mobi`]"
                  ></v-progress-circular>
                  <v-icon
                    v-if="!currentlyLoading[`${item.BookId}mobi`]"
                    title="mobi"
                    @click="
                      () =>
                        downloadFile('mobi', item.Title, item.BookId)
                    "
                    >mdi-download</v-icon
                  >
                </div>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-card>

      <v-card class="mx-auto" max-width="300" tile>
        <v-pagination
          v-model="currentPage"
          :circle="true"
          :disabled="false"
          :length="totalBooksCount"
          :next-icon="nextIcon"
          :prev-icon="prevIcon"
          :page="currentPage"
          :total-visible="totalVisible"
        ></v-pagination>
      </v-card>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const BOOKS_PER_PAGE = 50;

@Component({
  name: 'Genres',
  components: {},
})
export default class Genres extends Vue {
  private headers = [
    {
      text: 'Author',
      align: 'start',
      value: 'AuthorName',
      groupable: true,
    },
    {
      text: 'Book',
      align: 'left',
      value: 'Title',
      groupable: false,
    },
    {
      text: 'Date',
      align: 'left',
      value: 'Modified',
      groupable: true,
    },
  ];

  private genreBooks = [];
  private genreNames = [];
  private currentlyLoading = {};
  private genreName = 'humor';
  private currentPage = 1;
  private totalBooksCount = 0;
  private totalVisible = BOOKS_PER_PAGE;
  private selectedItem = 0;
  private nextIcon = 'mdi-arrow-right';
  private prevIcon = 'mdi-arrow-left';
  private search = '';

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

  async mounted() {
    const genreBooks = await fetch(
      `${this.SERVER_URL}/flibusta/genrebooks/${this.$route.params.id}`,
    ).then(x => x.json());

    this.genreName = this.$route.params.name;

    this.genreBooks = genreBooks.map(book => {
      const authorInfo = book.libavtorname_models[0];

      book.AuthorName = authorInfo
        ? `${authorInfo.LastName} ${authorInfo.FirstName} ${authorInfo.NickName}`
        : 'Unknown author';
      book.authorId = authorInfo?.AvtorId || 0;
      return book;
    });
    this.totalBooksCount = Math.ceil(
      this.genreBooks.length / BOOKS_PER_PAGE,
    );
  }
}
</script>

<style></style>
