import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { BreakPoint, Responsive } from '@/components/Grid/interface'

export interface EnumProps {
  label: string // 选项框显示的文字
  value: any // 选项框值
  color?: '' | 'success' | 'warning' | 'info' | 'danger'
  [key: string]: any
}

export type TypeProp = 'index' | 'selection' | 'expand'

export type SearchType =
  | 'input'
  | 'select'
  | 'select-v2'
  | 'tree-select'
  | 'cascader'
  | 'date-picker'
  | 'time-picker'
  | 'time-select'

export type SearchProps = {
  type: SearchType // 当前项搜索框的类型
  props?: any // element plus组件属性 参照官方文档来传递
  key?: string // 搜索参数 key 没定义时取当前列的 prop
  order?: number // 搜索项排序, 数字越小越靠前
  defaultValue?: string | number | any[] // 搜索项默认值
} & Partial<Record<BreakPoint, Responsive>>

export interface ColumnProps<T = any> // 此处泛型为表格row数据类型
  extends Partial<Omit<TableColumnCtx<T>, 'renderCell' | 'children'>> {
  hidden?: boolean // 是否隐藏列
  search?: SearchProps | undefined // 搜索项配置
  enum?: EnumProps[] | ((params?: any) => Promise<any>) // 枚举类型（渲染值的字典）,如果此列是查询项，会自动识别当作查询项
  isFilterEnum?: boolean // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
  fieldNames?: { label: string; value: string } // 指定enum的 label && value 的 key 值
  headerRender?: (row: ColumnProps) => any // tsx自定义表头内容渲染
  render?: (scope: { row: T }) => any // tsx自定义单元格内容渲染
  children?: ColumnProps[] // 子列
}

export interface Pageable {
  pageIndex: number
  pageSize: number
  total: number
}
export interface TableStateProps {
  tableData: any[]
  pageParams: Pageable
  searchParam: {
    [key: string]: any
  }
  totalParam: {
    [key: string]: any
  }
  icon?: {
    [key: string]: any
  }
}
export namespace HandleData {
  export type MessageType = '' | 'success' | 'warning' | 'info' | 'error'
}
