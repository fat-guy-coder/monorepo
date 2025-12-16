import { defineAsyncComponent } from 'vue'
import message from './Message/index.ts'

// 将所有组件转换为异步组件，以优化初始加载性能
const Input = defineAsyncComponent(() => import('./Input/index.vue'))
const Navigation = defineAsyncComponent(() => import('./Nav/fixedNavButton.vue'))
const Nav = defineAsyncComponent(() => import('./Nav/ScrollNav.vue'))
const NavCard = defineAsyncComponent(() => import('./Nav/NavCard.vue'))
const ThemeChange = defineAsyncComponent(() => import('./Theme/index.vue'))
const RouteTab = defineAsyncComponent(() => import('./Tab/RouteTab.vue'))
const Card = defineAsyncComponent(() => import('./Card/index.vue'))
const Tabs = defineAsyncComponent(() => import('./Tab/RouteTab.vue')) // Note: Duplicate of RouteTab
const ThemeSwitcher = defineAsyncComponent(() => import('./Theme/index.vue')) // Note: Duplicate of ThemeChange
const Code = defineAsyncComponent(() => import('./Code/index.vue'))
const Cascader = defineAsyncComponent(() => import('./Cascader/index.vue'))
const Menu = defineAsyncComponent(() => import('./Menu/index.vue'))
const Button = defineAsyncComponent(() => import('./Button/index.vue'))
const Spin = defineAsyncComponent(() => import('./Spin/index.vue'))
const Link = defineAsyncComponent(() => import('./Link/index.vue'))
const Select = defineAsyncComponent(() => import('./Select/index.vue'))
const List = defineAsyncComponent(() => import('./List/index.vue'))
const Progress = defineAsyncComponent(() => import('./Progress/index.vue'))
const Row = defineAsyncComponent(() => import('./Grid/Row.vue'))
const Col = defineAsyncComponent(() => import('./Grid/Col.vue'))
const Pagination = defineAsyncComponent(() => import('./Pagination/index.vue'))
const Modal = defineAsyncComponent(() => import('./Modal/index.vue'))
const Radio = defineAsyncComponent(() => import('./Radio/index.vue'))
const Slider = defineAsyncComponent(() => import('./Slider/index.vue'))
const Switch = defineAsyncComponent(() => import('./Switch/index.vue'))
const Checkbox = defineAsyncComponent(() => import('./Checkbox/index.vue'))
const InputNumber = defineAsyncComponent(() => import('./InputNumber/index.vue'))
const TimePicker = defineAsyncComponent(() => import('./TimePicker/index.vue'))
const Upload = defineAsyncComponent(() => import('./Upload/index.vue'))
const Transfer = defineAsyncComponent(() => import('./Transfer/index.vue'))
// const Form = defineAsyncComponent(() => import('./Form/Form.vue'))
// const FormItem = defineAsyncComponent(() => import('./Form/FormItem.vue'))

const createMarkedAsyncComponent = (loader: () => Promise<any>, name: string) => {
  const asyncComponent = defineAsyncComponent(loader);
  (asyncComponent as any).__name = name;
  return asyncComponent;
};
//布局
const Layout = createMarkedAsyncComponent(() => import('./Layout/index.vue'), 'Layout');
const Header = createMarkedAsyncComponent(() => import('./Layout/Header.vue'), 'Header');
const SideBar = createMarkedAsyncComponent(() => import('./Layout/SideBar.vue'), 'SideBar');
const Content = createMarkedAsyncComponent(() => import('./Layout/Content.vue'), 'Content');
const Footer = createMarkedAsyncComponent(() => import('./Layout/Footer.vue'), 'Footer');

//page
const PageHeader = createMarkedAsyncComponent(() => import('./page/pageHeader.vue'), 'PageHeader');
const PageFooter = createMarkedAsyncComponent(() => import('./page/pageFooter.vue'), 'PageFooter');

export {
  Layout,
  Header,
  SideBar,
  Content,
  Footer,
  Menu,
  Input,
  Select,
  Navigation,
  ThemeChange,
  RouteTab,
  Card,
  Tabs,
  ThemeSwitcher,
  Code,
  Cascader,
  Button,
  message, // message 不是组件，保持原样导出
  Spin,
  Link,
  List,
  Nav,
  NavCard,
  Progress,
  Row,
  Col,
  Pagination,
  Modal,
  Radio,
  Slider,
  Switch,
  Checkbox,
  InputNumber,
  TimePicker,
  Upload,
  Transfer,
  // Form,
  // FormItem,
  PageHeader,
  PageFooter,
}
