import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/index"
import { getServerConfig } from "./config/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./styles/index.scss";
const app = createApp(App);

getServerConfig(app).then(async (config) => {
  //  在默认配置加载后挂在应用实例
  app.use(ElementPlus, { size: "small", zIndex: 3000 });
  app.use(router);
  app.use(store);
  app.mount("#app");
});
