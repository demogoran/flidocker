<template>
  <div class="home">
    <Reader :id="$route.params.BookId"></Reader>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Reader from "../components/Reader.vue";

@Component({
  name: "ReaderLayout",
  components: { Reader }
})
export default class ReaderLayout extends Vue {}
</script>
