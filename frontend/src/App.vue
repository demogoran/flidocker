<template>
  <v-app>
     <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        clipped 
        permanent 
        app
      >
      <v-list-item class="px-2">
          <v-list-item-avatar>
              <v-icon>mdi-menu</v-icon>
          </v-list-item-avatar>
  
          <v-list-item-title>Menu</v-list-item-title>
  
          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
  
        <v-divider></v-divider>
  
        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title>
                 {{item.title}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>

    
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "App",
  components: {}
})
export default class App extends Vue {
  private mini = true;
  private drawer = false;
  private items = [
    { title: "Home", icon: "mdi-home-city", to: "/" },
    { title: "Genres", icon: "mdi-format-line-spacing", to: "/genres" },
    { title: "Search", icon: "mdi-book-search", to: "/search" }
  ];
}
</script>
