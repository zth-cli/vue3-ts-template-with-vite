import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/index"
import { getServerConfig } from "./config/index";
import "./styles/index.scss";
import directives from './directive'
// 安装toasts
import toasts from './components/Toasts'
import RegisterIcons from './icons/index'

const app = createApp(App);

getServerConfig(app).then(async (config) => {
  //  在默认配置加载后挂在应用实例
  RegisterIcons(app);
  app.use(toasts);
  // app.use(ElementPlus, { size: "small", zIndex: 3000, locale: zhCn });
  app.use(router);
  app.use(store);
  app.use(directives)
  app.mount("#app");
});
