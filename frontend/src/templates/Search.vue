<template>
  <div class="search">
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      class="authorsList"
    >
      <v-list-item class="px-2">
        <v-list-item-title>Authors</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-list-item>
        <v-treeview
          v-model="tree"
          :open="open"
          :items="items"
          activatable
          item-key="id"
          :open-on-click="false"
        >
          <template v-slot:prepend="{ item, open }">
            <v-icon v-if="!item.file">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <v-icon v-else>
              {{ files[item.file] }}
            </v-icon>
          </template>

          <template slot="label" slot-scope="{ item }">
            <a v-if="item.children" @click="setActiveAuthor(item)">{{
              `${item.name} (${item.children.length})`
            }}</a>
            <div v-if="!item.children">{{ item.name }}</div>
          </template>
        </v-treeview>
      </v-list-item>
    </v-navigation-drawer>

    <v-card-title>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-text-field
        v-model="searchBooks"
        append-icon="mdi-magnify"
        label="Search books"
        single-line
        hide-details
      ></v-text-field>
      <v-btn @click="() => searchBooksStart('books')"
        >Search books</v-btn
      >
    </v-card-title>
    <v-row fluid class="pageContent">
      <v-col>
        <v-row>
          <v-pagination
            v-model="currentPage"
            :length="Math.ceil(authorBooks.length / totalVisible)"
          ></v-pagination>
        </v-row>
        <v-row>
          <v-list three-line>
            <template v-for="item in pagedAuthorBooks">
              <v-list-item :key="`${item.name}${item.id}`">
                <v-list-item-content>
                  <v-list-item-title>
                    <router-link
                      :to="`/read/${item.BookId}`"
                      target="_blank"
                    >
                      {{ item.name }}
                    </router-link>

                    <v-col>
                      <div>
                        <v-progress-circular
                          indeterminate
                          color="primary"
                          v-if="currentlyLoading[`${item.BookId}fb2`]"
                        ></v-progress-circular>
                        <v-icon
                          v-if="
                            !currentlyLoading[`${item.BookId}fb2`]
                          "
                          title="fb2"
                          @click="
                            () =>
                              downloadFile(
                                'fb2',
                                item.Title,
                                item.BookId,
                              )
                          "
                          >mdi-download</v-icon
                        >

                        <v-progress-circular
                          indeterminate
                          color="primary"
                          v-if="
                            currentlyLoading[`${item.BookId}epub`]
                          "
                        ></v-progress-circular>
                        <v-icon
                          v-if="
                            !currentlyLoading[`${item.BookId}epub`]
                          "
                          title="epub"
                          @click="
                            () =>
                              downloadFile(
                                'epub',
                                item.Title,
                                item.BookId,
                              )
                          "
                          >mdi-download</v-icon
                        >

                        <v-progress-circular
                          indeterminate
                          color="primary"
                          v-if="
                            currentlyLoading[`${item.BookId}mobi`]
                          "
                        ></v-progress-circular>
                        <v-icon
                          v-if="
                            !currentlyLoading[`${item.BookId}mobi`]
                          "
                          title="mobi"
                          @click="
                            () =>
                              downloadFile(
                                'mobi',
                                item.Title,
                                item.BookId,
                              )
                          "
                          >mdi-download</v-icon
                        >
                      </div>
                    </v-col>
                  </v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.Desc"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-row>
        <v-row>
          <v-pagination
            v-model="currentPage"
            :length="Math.ceil(authorBooks.length / totalVisible)"
          ></v-pagination>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
