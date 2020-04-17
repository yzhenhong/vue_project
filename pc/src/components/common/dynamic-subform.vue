// 表单中的子表单数组
<template v-if="Array.isArray(item.items) && item.isAdd">
  <!-- 遍历子表单数组 -->
  <section>
    <template v-for="(dataItem, dataIndex) of value">
      <div :key=" 'group' + dataIndex" :ref="'formGroup' + index" class="form-group">
        <div :key="'group-sub' + dataIndex" class="title">
          <el-button
            @click="removeFormItem(dataIndex, item.prop)"
            icon="el-icon-delete"
            size="small"
            v-if="canRemove"
          ></el-button>
        </div>
        <!-- 遍历子表单的每一个表单项 -->
        <template v-for="(schemaItem, groupIndex) of item.items">
          <dynamic-form-item
            :item="schemaItem"
            :key="`sub-${dataIndex}-${groupIndex}`"
            :style="itemStyle"
            :value="dataItem[schemaItem.prop]"
            @item-update="itemUpdate(arguments, idx, dataItem, item.prop)"
          ></dynamic-form-item>
        </template>
      </div>
    </template>

    <div :key="'sub-' + index" class="action-box">
      <el-button
        @click="addFormItem(item.prop, value)"
        icon="el-icon-plus"
        type="default"
        v-if="canAdd"
      >添加一组</el-button>
    </div>
  </section>
</template>


<script>
  import DynamicFormItem from './dynamic-form-item'

  export default {
    name: 'DynamicSubform',
    components: { DynamicFormItem },

    props: ['value', 'item', 'index', 'idx', 'formDataTemplate'],
    data() {
      return {
        backupItem: {}
      }
    },

    computed: {
      itemStyle() {
        return this.maxWidth
          ? {
              maxWidth: this.maxWidth
            }
          : ''
      },
      canAdd() {
        return this.item.max ? this.value.length < this.item.max : true
      },
      canRemove() {
        const min = this.item.min ? this.item.min : 1
        return this.value.length > min
      }
    },

    methods: {
      removeFormItem(dataIndex, itemProp) {
        this.backupItem = JSON.parse(JSON.stringify(this.value[dataIndex]))
        this.value.splice(dataIndex, 1)
      },
      addFormItem(prop, items) {
        // 添加实有车辆时，动态插入空的formData
        // console.log(prop)
        // 时空碰撞需求添加一组需要有默认值

        if (prop != 'unionList') {
          items.push(JSON.parse(JSON.stringify(this.formDataTemplate)))
        } else {
          let addItem = {
            ...(Array.isArray(items)
              ? items.length > 1
                ? items[items.length - 1]
                : this.backupItem
              : items)
          }
          items.push(addItem)
        }
        // items.push(JSON.parse(JSON.stringify(this.carInfo.subFormDataItem)))
      },
      itemUpdate([itemName, itemValue], idx, dataItem, prop) {
        this.$emit('item-update', [itemName, itemValue], idx, dataItem, prop)
      }
    }
  }
</script>
