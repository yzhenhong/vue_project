import Vue from 'vue'
import DynamicList from '@/components/common/dynamic-list'
import DraggableImage from '@/components/common/draggable-image'
import 'vue-easytable/libs/themes-base/index.css';
import { VTable, VPagination } from 'vue-easytable';
import './defineComponent';


// register globally
Vue.component('dynamic-list', DynamicList)
Vue.component('draggable-image', DraggableImage)
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);