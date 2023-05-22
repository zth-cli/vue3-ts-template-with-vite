import { IDatePickerType } from 'element-plus/es/components/date-picker/src/date-picker.type'
import { TreeComponentProps } from 'element-plus/es/components/tree/src/tree.type'
interface ItreeProps extends Partial<TreeComponentProps> {
  dataUrl?: string
  param?: { [x: string]: any }
  search?: boolean
  resDataName?: string
}

interface Icolumns {
  index?: number
  type?: string
  label?: string
  prop?: string
  slot?: string
  headerSlot?: string
  show?: boolean
  align?: string
  enum?: Array<any>
  childrens?: Array<Icolumns>
  width?: number
  minWidth?: string
  disabled?: boolean
  fixed?: string | boolean
  showOverflowTooltip?: boolean
  resizable?: boolean
  headerAlign?: string
  sortable?: boolean
  render?: (scope: any) => any // tsx自定义单元格内容渲染
  headerRender?: (row: Icolumns) => any // tsx自定义表头内容渲染
  sortMethod?: () => void
  filters?: Array<{ text: string; value: any }>
  renderHeader?: () => void
  filterMethod?: (value: any, row: { [x: string]: any }, column: { property: any }) => void
  sortBy?: string | Array<any> | (() => void)
  filteredValue?: Array<any>
  [x: string]: any
}
interface ItableProps {
  columns: Icolumns[]
  initData?: Array<any>
  tableSize?: string
  mode?: string
  defaultPanel?: Array<string>
  pageAlign?: string
  pageSize?: number
  pageIndex?: number
  showSettingToolbar?: boolean
  showPage?: boolean
  highlightCurrentRow?: boolean
  lazy?: boolean
  exportUrl?: string
  dataUrl?: string
  params?: { [x: string]: any }
  height?: string
  maxHeight?: string
  border?: boolean
  stripe?: boolean
  showSettingTool?: boolean
  showPanelTool?: boolean
  showSummary?: boolean
  responseName?: string | Array<string>
  isPrivate?: boolean
  summaryMethod?: (value: any, row: { [x: string]: any }, column: { property: any }) => void
  spanMethod?: ({ row, column, rowIndex, columnIndex }) => Array<number> | object
  rowKey?: string
  treeProps?: { children: string; hasChildren: string }
}

interface IformItem {
  name: string // key值
  label: string // label 名称
  type?: string // 条件类型
  default?: any // 默认值
  disabled?: boolean // 是否禁用
  disabledAll?: boolean // 是否禁用'全部'按钮
  options?: Array<{ [x: string]: any }>
  prop?: { label: string; value: string }
  format?: string
  remoteMethod?: Promise<any>
  dateSwitch?: Array<{ type: IDatePickerType; typeName: string }>
  dateTypeParamName?: string
  [key: string]: any
}
