<template>
  <div id="app">
    <div
      class="controls"
      v-touch:swipe.left="() => readingProgress++"
      v-touch:swipe.right="() => readingProgress--"
    ></div>

    <div class="fullscreen" @click="setFullScreen"></div>
    <BookReader
      v-if="url"
      :epub-url="url"
      :font-size="size"
      :themes="themes"
      :theme="currentTheme"
      :book-area="'area-content'"
      @toc="getContent"
      :progress.sync="readingProgress"
      :contentBookModify="140"
      ref="fullscreen"
    >
      <template slot="book-content">
        <div id="area-content" class="content-container"></div>
      </template>
      <template slot="progress-bar"></template>
    </BookReader>
  </div>
</template>

<script lang="ts">
import { BookReader, PreferencesDropdown, TreeMenu } from "vue-epub-reader";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Epub",
  components: {
    BookReader,
    PreferencesDropdown,
    TreeMenu
  }
})
export default class Reader extends Vue {
  private url = "";
  private size = 80;
  private currentTheme = "beige";
  private themes = {
    white: {
      body: {
        color: "#000000",
        background: "#ffffff"
      },
      name: "WHITE"
    },
    beige: {
      body: {
        color: "#000000",
        background: "#f3e8d2"
      },
      name: "BEIGE"
    },
    night: {
      body: {
        color: "#ffffff",
        background: "#4a4a4a"
      },
      name: "NIGHT"
    }
  };
  private searchQuery = "";
  private readingProgress = 0;
  private openSearch = false;
  private openContent = false;
  private searchContent = [];
  private toc = [];

  setFullScreen() {
    if (!document.fullscreenElement) {
      document.querySelector("#app").requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  toggleSearchWidget() {
    this.openSearch = !this.openSearch;
  }

  showContent() {
    this.openContent = !this.openContent;
  }

  onSearchResults(value) {
    this.searchContent = value;
  }

  getContent(value) {
    this.toc = value;
  }

  async mounted() {
    this.url = `${this.SERVER_URL}/flibusta/book.epub`;

    this.$root.$on("toc", toc => {
      this.toc = toc;
    });
  }
}
</script>

<style>
html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
}
.epub-reading-progress-bar {
  display: none;
}
.fullscreen {
  position: absolute;
  width: 50px;
  height: 50px;
  background: #c000ff36;
  z-index: 103;
  right: 0;
}

.controls {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
}
.arrow {
  z-index: 101;
}

#area-content {
  width: 65%;
  height: 100vh;
  margin: auto;
}
#area-content * {
  height: 100vh !important;
}

#area-content iframe {
  border: none;
}
</style>
