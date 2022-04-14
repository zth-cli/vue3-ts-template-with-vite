export const defaultProps = {
  columns: {
    type: Array,
    required: true,
  },
  tableData: {
    type: Array,
  },
  tableSize: {
    default: 'default',
  },
  pageSize: {
    default: 20,
  },
  pageIndex: {
    default: 1,
  },
  showSettingToolbar: {
    type: Boolean,
    default: true,
  },
  showPage: {
    type: Boolean,
    default: true,
  },
  highlightCurrentRow: {
    type: Boolean,
    default: false,
  },
  lazy: {
    type: Boolean,
    default: false,
  },
  dataUrl: {},
  params: {},
  height: {
    default: '66vh',
  },
  maxHeight: {
    type: String,
  },
  border: {
    type: Boolean,
    default: true,
  },
  showSummary: {
    type: Boolean,
    default: false,
  },
  summaryMethod: {
    // 合计自定义方法
    type: Function,
  },
  spanMethod: {
    // 合并单元格
    type: Function,
  },
  rowKey: { type: String, default: 'id' }, // 支持树类型的数据的显示,rowKey不为空时生效
  treeProps: {
    type: Object,
    default: function () {
      return { children: 'children', hasChildren: 'hasChildren' }
    },
  },
  stripe: {
    type: Boolean,
    default: true,
  },
}
