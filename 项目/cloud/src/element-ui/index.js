/**
 * @intro: element-ui组件.
 */
import {
  // plugin
  Loading,
  MessageBox,
  Notification,
  Message,
  Breadcrumb,
  BreadcrumbItem,
  DatePicker,
  // component
  Input,
  Divider,
  Button,
  Radio,
  RadioGroup,
  Row,
  Select,
  Option,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  PageHeader,
  FormItem,
  Dialog,
  Table,
  TableColumn,
  Pagination,
  Main,
  Container,
  Menu,
  MenuItem,
  Submenu,
  Image,
  Card,
  Aside,
  Switch,
  Upload,
  Tree,
  Steps,
  Step,
  Cascader,
  Tabs,
  TabPane,
  CheckboxGroup,
  Checkbox,
  Tag,
  Link,
  Avatar,
  Collapse,
  CollapseItem,
  Alert,
  CascaderPanel,
  Popover,
  Badge,
  Slider,
  InputNumber,
  RadioButton,
  Drawer
} from 'element-ui'
// 按道理来说可以导入进来，但是提示没有这个，所以直接单独导入进来吧
import Scrollbar from 'element-ui/lib/scrollbar'

const components = [
  Input,
  Button,
  Dropdown,
  Radio,
  RadioGroup,
  DropdownMenu,
  DropdownItem,
  DatePicker,
  Form,
  FormItem,
  Dialog,
  Breadcrumb,
  BreadcrumbItem,
  Select,
  Option,
  Row,
  Card,
  Col,
  PageHeader,
  Option,
  Divider,
  Table,
  TableColumn,
  Pagination,
  Main,
  Container,
  Menu,
  MenuItem,
  Submenu,
  Aside,
  Image,
  Scrollbar,
  Switch,
  Upload,
  Tree,
  Steps,
  Step,
  Cascader,
  Tabs,
  TabPane,
  CheckboxGroup,
  Checkbox,
  Tag,
  Link,
  Avatar,
  Collapse,
  CollapseItem,
  Alert,
  CascaderPanel,
  Popover,
  Badge,
  Slider,
  InputNumber,
  RadioButton,
  Drawer
]

const install = Vue => {
  if (install.installed) return false

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.use(Loading.directive)

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$notify = Notification
  Vue.prototype.$message = Message

  install.installed = true
}

export default install
