import Vue from 'vue'
import DynamicForm from '@/components/common/dynamic-form'
import DynamicList from '@/components/common/dynamic-list'
import DynamicInfo from '@/components/common/dynamic-info'
import DraggableImage from '@/components/common/draggable-image'
import 'vue-easytable/libs/themes-base/index.css';
import { VTable, VPagination } from 'vue-easytable';
import './defineComponent';


// register globally
Vue.component('dynamic-form', DynamicForm)
Vue.component('dynamic-list', DynamicList)
Vue.component('dynamic-info', DynamicInfo)
Vue.component('draggable-image', DraggableImage)
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);