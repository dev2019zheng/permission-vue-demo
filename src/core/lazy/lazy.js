import Vue from "vue";
import PanelCard from "../../components/PanelCard/index.js";

import {
  Layout,
  Header,
  Sider,
  Submenu,
  Icon,
  Menu,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  DatePicker,
  Modal,
  Input,
  Progress,
  Upload,
  Tree,
  Table,
  Row,
  Col,
  Circle,
  Card,
  MenuItem,
  Message,
  Content,
  LoadingBar,
  Form,
  FormItem,
  Notice
} from "view-design";
import { has } from "@/core/directive/permisson";

Vue.component("Button", Button);
Vue.component("Layout", Layout);
Vue.component("Header", Header);
Vue.component("Sider", Sider);
Vue.component("Submenu", Submenu);
Vue.component("Icon", Icon);
Vue.component("Menu", Menu);
Vue.component("MenuItem", MenuItem);
Vue.component("Breadcrumb", Breadcrumb);
Vue.component("BreadcrumbItem", BreadcrumbItem);
Vue.component("Input", Input);
Vue.component("Modal", Modal);
Vue.component("DatePicker", DatePicker);
Vue.component("Progress", Progress);
Vue.component("Table", Table);
Vue.component("Form", Form);
Vue.component("FormItem", FormItem);
Vue.component("Tree", Tree);
Vue.component("Upload", Upload);
Vue.component("i-row", Row);
Vue.component("i-col", Col);
Vue.component("Card", Card);
Vue.component("i-circle", Circle);
Vue.component("Content", Content);
Vue.component("LoadingBar", LoadingBar);
Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice;

Vue.component("PanelCard", PanelCard);
Vue.directive("has", has);
