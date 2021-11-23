<template>
  <div class="curd_table">
    <div class="panel_tool_left" v-if="showPanelTool && mode !== 'simple'">
      <el-button icon="el-icon-plus" size="mini" v-if="defaultPanel.includes('add')" type="primary" @click="addRow()">新增</el-button>
      <el-button icon="el-icon-edit" size="mini" v-if="defaultPanel.includes('edit')" type="primary" :disabled="isSingle" @click="editRow()"
        >修改</el-button
      >
      <el-popover placement="top" width="160" v-model="visible">
        <p>确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="
              visible = false
              deleteRows()
            "
            >确定</el-button
          >
        </div>
        <el-button
          v-if="defaultPanel.includes('delete')"
          icon="el-icon-circle-close"
          slot="reference"
          type="danger"
          class="warning"
          :disabled="isMultiple"
          size="mini"
          >删除
        </el-button>
      </el-popover>
      <slot name="panel"></slot>
    </div>
    <div class="panel_tool_right" v-if="showSettingTool && mode !== 'simple'">
      <el-button type="primary" icon="el-icon-refresh" size="mini" @click="queryData"></el-button>
      <el-popover type="primary" placement="bottom-end" width="200" trigger="click">
        <div style="margin: 5px 0">
          <div>
            <div v-for="(col, index) in columns" :key="index">
              <el-checkbox @change="columnsChange" v-if="col.label" v-model="col.show" :label="col.label">
                {{ col.label }}
              </el-checkbox>
            </div>
          </div>
          <div></div>
        </div>
        <el-button slot="reference" size="mini" icon="el-icon-caret-bottom"></el-button>
      </el-popover>
    </div>
    <div class="curd_table_main">
      <DataTable
        ref="tableView"
        :columns="mColumns"
        :tableData="tableData"
        :border="border"
        :size="tableSize"
        :height="height"
        :rowKey="rowKey"
        :stripe="stripe"
        :treeProps="treeProps"
        :showSummary="showSummary"
        :summaryMethod="summaryMethod"
        :spanMethod="spanMethod"
        :limit="pageParam.limit"
        :start="pageParam.start"
        :showPage="showPage"
        :highlight-current-row="highlightCurrentRow"
        @row-click="rowClick"
        @row-dblclick="rowDblclick"
        @selection-change="selectionChange"
        @current-change="handleCurrentChange"
        style="width: 100%"
        v-loading="loading"
        :key="key"
      >
        <template v-for="item in slotArr" v-slot:[item.slot]="Props">
          <slot :name="item.slot" :rowData="Props.rowData"></slot>
        </template>
        <template v-for="item in headerSlotArr" v-slot:[item.headerSlot]="Props">
          <slot :name="item.headerSlot" :rowData="Props.rowData"></slot>
        </template>
        <template v-slot:index="Props">
          <slot name="index" v-if="showPage">
            {{ Props.rowData.index + (pageParam.start - 1) * pageParam.limit + 1 }}
          </slot>
          <slot name="index" v-else>{{ Props.rowData.index + 1 }}</slot>
        </template>
      </DataTable>
    </div>
    <div v-if="showPage" style="margin:10px 10px 0 10px; overflow: hidden">
      <div :style="'text-align: ' + this.pageAlign">
        <el-pagination
          :total="total"
          :page-size="pageParam.limit"
          :current-page="pageParam.start"
          @current-change="changePage"
          @size-change="changePageSize"
          :size="tableSize"
          layout="total, sizes, prev, pager, next"
          background
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from './DataTable'
import { apiPost } from '@/api'
export default {
  props: {
    mode: {
      // 添加场景选择，适应紧凑布局，充分利用空间
      type: String,
      default: 'normal' // 'normal' 正常模式 'simple'简单模式，布局更紧凑
    },
    defaultPanel: {
      type: Array,
      default: function() {
        return ['add', 'edit', 'delete']
      }
    },
    pageAlign: {
      default: 'right'
    },
    tableSize: {
      default: 'normal'
    },
    limit: {
      default: 20
    },
    stripe: {
      type: Boolean,
      default: true
    },
    showPage: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    columns: {},
    dataUrl: {},
    params: {},
    height: { default: '66vh' },
    maxHeight: { default: '' },
    showSummary: { default: false },
    summaryMethod: {
      // 合计自定义方法
      type: Function
    },
    spanMethod: {
      type: Function
    },
    border: {
      type: Boolean,
      default: false
    },
    resizable: {
      type: Boolean,
      default: true
    },
    showSettingTool: {
      type: Boolean,
      default: true
    },
    showPanelTool: {
      type: Boolean,
      default: true
    },
    responseName: {
      type: [String, Array],
      default: 'list'
    },
    isPrivate: {
      // 是否添加私有属性，用于某些情况直接添加私有属性无法生效问题
      type: Boolean,
      default: false
    },
    rowKey: { type: String }, // 支持树类型的数据的显示,rowKey不为空时生效
    treeProps: {
      type: Object,
      default: function() {
        return { children: 'children', hasChildren: 'hasChildren' }
      }
    }
  },
  data() {
    return {
      loading: false,
      visible: false,
      tableData:
        process.env.NODE_ENV === 'production'
          ? []
          : [
              {
                creator: 'rzx007',
                id: 12,
                projectName: 'name',
                createDate: '12-11',
                description: 'w21',
                _disabled: 0
              },
              {
                creator: 'rzx007',
                id: 13,
                projectName: 'name',
                createDate: '12-11',
                description: 'w21',
                _disabled: 0
              }
            ],
      mColumns: [],
      selection: [],
      total: 0,
      pageParam: {
        start: 1,
        limit: 10
      },
      slotArr: [], // slot
      headerSlotArr: [], // 自定义表头
      lazyLoad: this.lazy,
      columnList: [],
      key: 0,
      timeout: {} // 请求防抖计时器
    }
  },
  components: { DataTable },
  computed: {
    isSingle() {
      return !(this.selection !== null && this.selection.length === 1)
    },
    isMultiple() {
      return !(this.selection != null && this.selection.length > 0)
    }
  },
  methods: {
    queryData() {
      if (!this.dataUrl || this.loading === true) {
        return
      }
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.selection = null
        this.tableData = []
        this.$emit('selection-change', null)
        this.loading = true
        const params = this.showPage
          ? Object.assign({}, JSON.parse(JSON.stringify(this.pageParam)), this.params, {
              start: (this.pageParam.start - 1) * this.pageParam.limit
            })
          : this.params
        apiPost(this.dataUrl, params)
          .then(res => {
            this.loading = false
            if (res.code === 0) {
              let data = res.data
              this.total = data.totalNum
              if (Array.isArray(this.responseName)) {
                this.responseName.forEach(item => {
                  data = data[item]
                })
              } else {
                data = res.data[this.responseName]
              }

              if (this.isPrivate) {
                data.forEach(item => {
                  // 添加私有属性，
                  item._disabled = 0
                })
              }
              this.tableData = data
              this.$emit('getTableData', this.tableData)
            }
          })
          .catch(() => {
            this.loading = false
          })
      }, 200)
    },
    changePage(page) {
      this.pageParam.start = page
      this.queryData()
    },
    changePageSize(limit) {
      this.pageParam.start = 1
      this.pageParam.limit = limit
      this.queryData()
    },
    rowClick(row) {
      // this.$refs.table.toggleAllSelection();
      this.$emit('row-click', row)
    },
    rowDblclick(row) {
      this.$emit('row-dblclick', row)
    },
    selectionChange(selection) {
      this.selection = selection
      this.$emit('selection-change', selection)
    },
    toggleRowSelection(rows) {
      // 设置选中
      this.$refs.tableView.toggleRowSelection(rows)
    },
    toggleAllSelection() {
      // 全选
      this.$refs.tableView.toggleAllSelection()
    },
    handleCurrentChange(row) {
      this.$emit('current-change', row)
    },
    addRow() {
      this.$emit('row-add', true)
    },
    editRow() {
      // 防止修改时，篡改table里的数据
      this.$emit('row-edit', Object.assign({}, this.selection[0]))
    },
    deleteRows() {
      this.$emit('row-delete', this.selection)
    },
    getSlot() {
      var that = this
      const mColumns = this.mColumns
      function Maps(mColumns) {
        mColumns.forEach(item => {
          const keys = Object.keys(item)
          if (keys.includes('slot')) {
            that.slotArr.push(item)
          }
          if (item.children && item.children.length > 0) {
            Maps(item.children)
          }
        })
      }
      Maps(mColumns)
    },
    getHeaderSlot() {
      var that = this
      const mColumns = this.mColumns
      function Maps(mColumns) {
        mColumns.forEach(item => {
          const keys = Object.keys(item)
          if (keys.includes('headerSlot')) {
            that.headerSlotArr.push(item)
          }
          if (item.children && item.children.length > 0) {
            Maps(item.children)
          }
        })
      }
      Maps(mColumns)
    },
    columnsChange() {
      const list = []
      for (let key = 0; key < this.columns.length; key++) {
        if (this.columns[key] instanceof Object && this.columns[key].show) {
          list.push(this.columns[key])
        }
      }
      this.key = this.key + Math.random()
      this.mColumns = list
      this.$nextTick(() => {
        this.mColumns = list
        // this.$refs.tableView.doLayout();
      })
    }
  },
  created() {
    if (!this.showPage) {
      delete this.pageParam.limit
      delete this.pageParam.start
    }
    this.mColumns = this.columns
    this.getSlot()
    this.getHeaderSlot()

    if (this.limit != null && this.showPage) {
      this.pageParam.limit = this.limit
    }
    if (!this.lazyLoad) {
      this.queryData()
    }
    this.columns.forEach(item => {
      item.show = true
    })
  },
  watch: {
    params: {
      handler(curVal) {
        if (this.showPage) {
          this.pageParam.start = 1
        }
        if (!this.lazyLoad) {
          this.queryData()
        }
        this.lazyLoad = false
      },
      deep: true
    },
    columns: {
      handler(curVal) {
        this.mColumns = curVal
      },
      deep: true
    },
    dataUrl: {
      handler(curVal) {
        if (this.showPage) {
          this.pageParam.start = 1
        }
        this.queryData()
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">
.curd_table {
  // background-color: #fff;
  // @include content-background();
  padding: 10px;
  /* margin-top: 20px; */
  border-radius: 4px;
  // @include box-shadow();
  .panel_tool_left {
    float: left;
    color: #666;
    font-size: 14px;
    padding-bottom: 8px;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    @include striped-background();
  }
  .panel_tool_right {
    float: right;
    padding-bottom: 8px;
  }
  button {
    margin-left: 8px;
  }
}
</style>
