interface ItreeProps {
  dataUrl?: string
  param?: { [x: string]: any }
  search?: boolean
  treeProps?: any
  defaultExpandAll?: boolean
  expandOnclickNode?: boolean
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
  fixed?: string | boolean
  showOverflowTooltip?: boolean
  resizable?: boolean
  headerAlign?: string
  sortable?: boolean
  sortMethod?: () => void
  filters?: Array<{ text: string; value: any }>
  renderHeader?: () => void
  filterMethod?: (value: any, row: { [x: string]: any }, column: { property: any }) => void
  sortBy?: string | Array<any> | (() => void)
  filteredValue?: Array<any>
}
interface ItableProps {
  columns: Icolumns[]
  tableData?: Array<any>
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
  dataUrl?: string
  params?: {[x:string] :any}
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
  spanMethod?: () => void
  rowKey?: string
  treeProps?: { children: string; hasChildren: string }
}

interface formItem {
  name: string
  label: string
  type: string
  default?: any
  disabled?: boolean
  options?: any[]
  format?: string
  remoteMethod?: Promise<any>
  dateSwitch?: Array<{ type: string; typeName: string }>
  dateTypeParamName?: string
  [key: string]: any
}
