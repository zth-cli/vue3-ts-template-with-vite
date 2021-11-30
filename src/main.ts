import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/index"
import { getServerConfig } from "./config/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "./styles/index.scss";
import directives from './directive'
const app = createApp(App);

getServerConfig(app).then(async (config) => {
  //  在默认配置加载后挂在应用实例
  app.use(ElementPlus, { size: "small", zIndex: 3000, locale: zhCn });
  app.use(router);
  app.use(store);
  app.use(directives)
  app.mount("#app");
});
