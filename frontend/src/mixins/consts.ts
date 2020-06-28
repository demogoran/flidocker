import { Component, Vue } from "vue-property-decorator";

@Component
export default class ConstsMixin extends Vue {
  public SERVER_URL = `http://${window.location.hostname}:5000`; //"http://localhost:5000";
}
