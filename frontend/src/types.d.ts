import { Vue } from 'vue-property-decorator';
declare module 'vue/types/vue' {
  interface Vue {
    SERVER_URL: string;
    $loadScript: (string) => {};
  }
}
