<template>
  <div class="home">
    <Reader :url="url"></Reader>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Reader from "../components/Reader.vue";
import Epub from "../components/Epub.vue";

@Component({
  name: "Home",
  components: { Reader }
})
export default class Home extends Vue {
  private url = "";

  /* async mounted() {
    try {
      const result = await fetch(`${this.SERVER_URL}/flibusta/book`).then(x =>
        x.text()
      );
      this.html = result;
    } catch (ex) {
      console.error(ex);
    }
  } */
}
</script>
