<template>
  <div id="app">
    <v-card>
      <v-card-title>
        Category Books
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
        :items="genreList"
        item-key="BookId"
        sort-by="Title"
        group-by="GenreMeta"
        class="elevation-1"
        show-group-by
        :items-per-page="-1"
        :search="search"
      >
        <template v-slot:item.GenreDesc="{ item }">
          <router-link
            :to="`/genres/${item.GenreId}/${item.GenreDesc}`"
            >{{ item.GenreDesc }}</router-link
          >
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'GenresList',
  components: {},
})
export default class GenresList extends Vue {
  private headers = [
    {
      text: 'Genre',
      align: 'left',
      value: 'GenreDesc',
      groupable: false,
    },
  ];
  private genreList = [];
  private selected = 0;
  private search = '';

  async mounted() {
    this.genreList = await fetch(
      `${this.SERVER_URL}/flibusta/genrelist`,
    ).then(x => x.json());
  }
}
</script>

<style></style>
