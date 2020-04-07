import Vue from 'vue'
import {
    Pagination,
    Dialog,
    Loading,
    Message,
    Table,
    TableColumn,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tree,
    Upload,
    Container,
    Header,
    Aside,
    Main,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    Input,
    Select,
    Option,
    Row,
    Col,
    Scrollbar,
    Card,
    Radio,
    Tooltip,
    Drawer,
    MessageBox
} from 'element-ui';
//样式文件，需单独引入
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tree);
Vue.use(Upload);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Row);
Vue.use(Col);
Vue.use(Scrollbar);
Vue.use(Card);
Vue.use(Radio);
Vue.use(Tooltip)
Vue.use(Drawer)
Vue.prototype.$message = Message
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$confirm = MessageBox.confirm;