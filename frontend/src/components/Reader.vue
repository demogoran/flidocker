<template>
  <div class="reader">
    <div
      id="controls"
      v-touch:swipe.left="() => rendition.next()"
      v-touch:swipe.right="() => rendition.prev()"
    ></div>

    <div v-if="loading">LOADING</div>
    <div id="sidebar">
      <div id="panels">
        <!-- <input id="searchBox" placeholder="search" type="search"> -->

        <!-- <a id="show-Search" class="show_view icon-search" data-view="Search">Search</a> -->
        <a id="show-Toc" class="show_view icon-list-1 active" data-view="Toc"
          >TOC</a
        >
        <a
          id="show-Bookmarks"
          class="show_view icon-bookmark"
          data-view="Bookmarks"
          >Bookmarks</a
        >
        <!-- <a id="show-Notes" class="show_view icon-edit" data-view="Notes">Notes</a> -->
      </div>
      <div id="tocView" class="view"></div>
      <div id="searchView" class="view">
        <ul id="searchResults"></ul>
      </div>
      <div id="bookmarksView" class="view">
        <ul id="bookmarks"></ul>
      </div>
      <div id="notesView" class="view">
        <div id="new-note">
          <textarea id="note-text"></textarea>
          <button id="note-anchor">Anchor</button>
        </div>
        <ol id="notes"></ol>
      </div>
    </div>
    <div id="main">
      <div id="titlebar">
        <div id="opener">
          <a id="slider" class="icon-menu">Menu</a>
        </div>
        <div id="metainfo">
          <span id="book-title"></span>
          <span id="title-seperator">&nbsp;&nbsp;–&nbsp;&nbsp;</span>
          <span id="chapter-title"></span>
        </div>
        <div id="title-controls">
          <a id="bookmark" class="icon-bookmark-empty">Bookmark</a>
          <a id="setting" class="icon-cog">Settings</a>
          <a id="fullscreen" class="icon-resize-full">Fullscreen</a>
        </div>
      </div>

      <div id="divider"></div>
      <div id="prev" class="arrow">‹</div>
      <div id="viewer"></div>
      <div id="next" class="arrow">›</div>

      <div id="loader"><img src="img/loader.gif" /></div>
    </div>
    <div class="modal md-effect-1" id="settings-modal">
      <div class="md-content">
        <h3>Settings</h3>
        <div>
          <p>
            <input
              type="checkbox"
              id="sidebarReflow"
              name="sidebarReflow"
            />Reflow text when sidebars are open.
          </p>
        </div>
        <div class="closer icon-cancel-circled"></div>
      </div>
    </div>
    <div class="overlay"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Reader extends Vue {
  @Prop()
  private url = "";

  private loading = false;
  private rendition = null;

  async mounted() {
    await Promise.all([
      this.$loadScript("../reader/js/jquery.min.js"),
      this.$loadScript("../reader/js/zip.min.js"),
      this.$loadScript("../reader/js/screenfull.min.js"),
      this.$loadScript("../reader/js/epub.min.js"),
      this.$loadScript("../reader/js/reader.min.js")
    ]);

    // eslint-disable-next-line
     // @ts-ignore
    window.reader = window.ePubReader(`${this.SERVER_URL}/flibusta/book.epub`, {
      restore: true,
      width:
        parseInt(
          window.getComputedStyle(document.getElementById("viewer")).width
        ) * 2,
      height: parseInt(
        window.getComputedStyle(document.getElementById("viewer")).height
      )
    });

    this.rendition = window["reader"].book.rendition;
  }
}
</script>

<style src="../css/normalize.css"></style>
<style src="../css/main.css"></style>
<style src="../css/popup.css"></style>

<style scope>
#viewer {
  width: calc(100% - 50px) !important;
  margin: 0 25px;
}
#controls {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
}
.arrow {
  z-index: 101;
}
</style>
