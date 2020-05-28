<template>
  <section :class="theme" class="dynamic-list">
    <div class="list-error" v-if="disabled">
      <span class="txt">{{ message }}</span>
      <el-link @click="goToFirstPage" type="primary">返回第一页</el-link>
    </div>
    <template v-else>
      <!-- 表头自定义 -->
      <header class="block-title header" v-if="title || $slots.header">
        <span v-if="title">{{ title }}</span>
        <slot name="header" v-if="$slots.header"></slot>
      </header>

      <!-- 表格 -->
      <el-table
        :data="value"
        :fit="true"
        v-loading="listLoading"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <!-- 列 -->
        <template v-for="(col, index) of computedSchema">
          <slot :name="col.slot" :width="col.width" v-if="col.slot"></slot>
          <el-table-column
            :key="index"
            :show-overflow-tooltip="col.showOverflowTooltip === false?false:true"
            v-bind="col"
            v-else
          >
            <template v-if="col.component" v-slot="scope">
              <component :col="col" :is="col.component" :scope="scope" v-on="$listeners"></component>
            </template>

            <template v-if="Array.isArray(col.columns)">
              <el-table-column
                :key="index2"
                :show-overflow-tooltip="col.showOverflowTooltip === false?false:true"
                v-bind="col2"
                v-for="(col2, index2) of col.columns"
              ></el-table-column>
            </template>
          </el-table-column>
        </template>
        <!-- 传递插槽 -->
        <slot :name="slot" :slot="slot" v-for="slot in Object.keys($slots)" />
      </el-table>
      <!-- 分页 -->
      <slot name="pager">
        <el-pagination
          :disabled="listLoading"
          @current-change="onPageCurrentChange"
          @size-change="onPageSizeChange"
          v-bind="pagerOptions"
        >
          <slot
            class="pager-slot"
            name="pager-slot"
            v-bind="{pagerOptions, listLoading, onPageCurrentChange, onPageSizeChange}"
          ></slot>
        </el-pagination>
      </slot>
    </template>  
  </section>
</template>

<script>
  export default {
    name: 'DynamicList',
    inheritAttrs: false,
    props: {
      value: {
        type: Array,
        default: _ => []
      },
      schema: {
        type: Array,
        default: _ => []
      },
      pager: {
        type: Object,
        default: _ => ({})
      },
      autoFetch: {
        type: Boolean,
        default: true
      },
      listLoading: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    },

    data: () => ({
      innerPager: null,
      pagerDefaults: {
        total: 0,
        currentPage: 0,
        pageSize: 15,
        pageSizes: [15, 30, 50],
        layout: 'total, sizes, prev, pager, next, jumper',
        hideOnSinglePage: true,
      },
      disabled: false,
      message: '',
    }),
    computed: {
      computedSchema() {
        return this.schema.filter(Boolean)
      },
      pagerOptions: {
        get() {
          this.innerPager = {
            ...this.pagerDefaults,
            ...(this.pager || {})
          }
          return this.innerPager
        },
        set(val) {
          this.innerPager = val
        }
      },
    },
    watch: {
      pagerOptions: {
        handler(val) {
          if (val && val.total) {
            this.checkPageRange()
          }
        },
        deep: true
      },
    },

    created() {
      if (this.autoFetch) {
        this.fetchData()
      }
    },

    methods: {
      onPageCurrentChange(index) {
        this.pagerOptions.currentPage = index
        this.fetchData()
      },
      onPageSizeChange(size) {
        this.pagerOptions.pageSize = size
        this.pagerOptions.currentPage = 1
        this.fetchData()
      },
      fetchData() {
        this.$emit('update:pager', this.pagerOptions)
        this.$emit('fetch-list', this.pagerOptions)
      },
      checkPageRange() {
        const { currentPage, pageSize, total } = this.pagerOptions
        const totalPages = Math.ceil(total / pageSize)
        const outOfRange = currentPage > totalPages
        this.message = outOfRange ? '页码超出范围' : ''
        this.disabled = outOfRange
      },
      goToFirstPage() {
        console.log("goToFirstPage")
        this.pagerOptions.currentPage = 1
        this.fetchData()
      },
    }
  }
</script>

<style scoped lang="less">
</style>
