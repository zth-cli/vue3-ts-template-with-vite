import type { VNode, Ref, ComputedRef, ExtractPropTypes, CSSProperties } from 'vue'
import type {
  FormProps,
  FormRules,
  FormItemProps,
  RowProps,
  ColProps,
  // 表单
  AutocompleteProps,
  cascaderProps,
  CheckboxGroupProps,
  ColorPickerProps,
  DatePickerProps,
  InputProps,
  InputNumberProps,
  RadioGroupProps,
  RateProps,
  ISelectProps,
  SliderProps,
  SwitchProps,
  TimePickerDefaultProps,
  RadioProps,
  // 显示
  TextProps,
  ImageProps,
  LinkProps,
  TagProps,
  ProgressProps,
  ButtonType,
  useTooltipProps,
} from 'element-plus'
import type { TimeSelectProps } from 'element-plus/es/components/time-select/src/time-select'

/**
 * 原生input所有的type类型
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
 */
export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

/**
 * 所有表单的类型 默认是  input
 */
export type FormItemValueType =
  | 'autocomplete'
  | 'cascader'
  | 'checkbox'
  | 'color-picker'
  | 'date-picker'
  | 'input-number'
  | 'img'
  | 'radio'
  | 'rate'
  | 'select'
  | 'slider'
  | 'switch'
  | 'time-picker'
  | 'time-select'
  | 'textarea'
  | 'input'
  | 'text'
  | undefined

/**
 * 表单绑定值的类型
 */
export type ModelValueType =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | string[]
  | number[]
  | boolean[]
  | Date[]
  | [Date, Date]
  | [number, number]
  | [string, string]
  | string[][]
  | number[][]

/**
 * 需要去除或者需要重新定义的类型
 */
export type OmitTypes =
  // 去除的
  | 'modelValue'
  | 'src'
  | 'autocomplete'
  | 'type'
  | 'loading'
  | 'step'
  | 'format'
  | 'filterMethod'
  | 'id'
  | 'effect'
  | 'height'
  | 'autosize'

/**
 *  自定义props类型  支持对象object，computed，函数和Promise
 */
export type PropsItemType<T extends Record<string, any> = any> =
  | Partial<T>
  | ComputedRef<Partial<T>>
  | ((
      value: ModelValueType,
      data: {
        row: Record<string, any>
        index: number
      },
    ) => Partial<T> | Promise<Partial<T>>)
  | Promise<Partial<T>>

/**
 * 拓展el-form组件类型
 */
export interface PlusFormProps extends /* @vue-ignore */ Partial<Mutable<FormProps>> {
  defaultValues?: ModelValues
  columns?: ZthFormItemProp[]
  labelWidth?: string
  labelPosition?: 'left' | 'right' | 'top'
  rowProps?: Partial<Mutable<RowProps>>
  colProps?: Partial<Mutable<ColProps>>
  labelSuffix?: string
  hasErrorTip?: boolean
  showFooter?: boolean
  hasReset?: boolean
  hasLabel?: boolean
  submitText?: string
  resetText?: string
  submitLoading?: boolean
  footerAlign?: 'left' | 'right' | 'center'
  rules?: FormRules
}

/**
 * 选择框类型
 */
export interface OptionsRow {
  label: number | string
  value: number | string
  /**
   * 小圆点背景色，
   * color 优先级 高于 type
   */
  color?: string
  /**
   * 小圆点背景色，
   * type 优先级 低于 color，
   * 只支持 'success' | 'warning' | 'info' | 'primary' | 'danger'
   */
  type?: Exclude<ButtonType, 'default' | 'text' | ''>
  /**
   * 表单子项的props  如 el-checkbox-group下的el-checkbox的props
   */
  fieldItemProps?: RecordType
  /**
   * el-checkbox-group下的，每一项el-checkbox的各自插槽(即el-checkbox的default插槽)。
   * el-radio-group下的，每一项el-checkbox的内容各自插槽(即el--radio的default插槽)。
   * el-select下的，每一项el-option的内容整体插槽(即el-option的default插槽)。
   *
   * @see https://element-plus.org/zh-CN/component/checkbox.html#checkbox-slots
   * @see https://element-plus.org/zh-CN/component/radio.html#radio-slots
   */
  fieldSlot?: (option?: OptionsRow) => VNode | string
  /**
   * 子选项
   */
  children?: OptionsRow[]
}
/**
 * 选择类型   支持数组，computed，函数和Promise
 */
export type OptionsType =
  | OptionsRow[]
  | ComputedRef<OptionsRow[]>
  | ((props?: ZthFormProp) => OptionsRow[] | Promise<OptionsRow[]>)
  | Promise<OptionsRow[]>

/**
 * 提取el-tooltip的props类型
 */
export declare type ElTooltipProps = ExtractPropTypes<typeof useTooltipProps>
/**
 * 提取el-cascader的props类型
 */
export type CascaderProps = ExtractPropTypes<typeof cascaderProps>

/**
 * 表单和现实组件所有字段类型
 */
export type FieldProps = Partial<
  {
    [key: string]: any
    style: CSSProperties
    /**
     * @description  输入框行数，仅 type 为 'textarea' 时有效
     * @description  补充element-plus input:type='textarea' 时的ts类型缺失
     */
    rows: number
    autocomplete: string
    /**
     * type 类型
     */
    type:
      | DatePickerProps['type']
      | TextProps['type']
      | LinkProps['type']
      | ProgressProps['type']
      | InputType
      | 'textarea'
    /**
     *@description  `valueType` 为 `img `时是 `"lazy" | "eager"`，其余是`boolean`类型
     */
    loading: SwitchProps['loading'] | ImageProps['loading']
    /**
     * @description  `valueType` 为 `time-select` 时是`string`类型， 其余是`number`类型
     */
    step: SliderProps['step'] | TimeSelectProps['step'] | InputNumberProps['step']
    /**
     *@description  `valueType` 为 `progress` 时是函数类型，其余是字符串类型
     */
    format:
      | DatePickerProps['format']
      | TimePickerDefaultProps['format']
      | TimeSelectProps['format']
      | ProgressProps['format']

    /**
     * @description  `valueType` 为 `cascader` 时是`(node: Node, keyword: string) => boolean`类型
     * @description  `valueType` 为 `select` 时是`() => void`类型
     */
    filterMethod: CascaderProps['filterMethod'] | ISelectProps['filterMethod']
    /**
     * @description  `valueType` 为 `date-picker` 时**可能**是`[string, string]`类型，其余是`string`类型
     */
    id: string | [string, string]
    /**
     * @description  el-select，el-time-select 的 effect
     */
    effect: ISelectProps['effect']
    /**
     * @description  `valueType` 为 `slider` 时是`string`类型，其余是`number`类型
     */
    height: string | number
  } & Mutable<
    // 表单
    Omit<AutocompleteProps, OmitTypes> &
      Omit<CascaderProps, OmitTypes> &
      Omit<CheckboxGroupProps, OmitTypes> &
      Omit<ColorPickerProps, OmitTypes> &
      Omit<DatePickerProps, OmitTypes> &
      Omit<InputProps & { autosize: boolean | object }, OmitTypes> &
      Omit<InputNumberProps, OmitTypes> &
      Omit<RadioGroupProps, OmitTypes> &
      Omit<RateProps, OmitTypes> &
      Omit<ISelectProps, OmitTypes> &
      Omit<SliderProps, OmitTypes> &
      Omit<SwitchProps, OmitTypes> &
      Omit<TimePickerDefaultProps, OmitTypes> &
      Omit<TimeSelectProps, OmitTypes> &
      Omit<RadioProps, OmitTypes> &
      Omit<DatePickerProps, OmitTypes> &
      // 显示
      Omit<TextProps, OmitTypes> &
      Omit<ImageProps, OmitTypes> &
      Omit<LinkProps, OmitTypes> &
      Omit<TagProps, OmitTypes> &
      Omit<ProgressProps, OmitTypes>
  >
>

/**
 * 共享类型
 */
export interface CommonType {
  [index: string]: any
  /**
   * el-form-item的label;
   */
  label?: string
  /**
   *el-form-item的prop, el-input等所有表单项的双向绑定的值;
   */
  prop: string

  /**
   *  宽
   */
  width?: string | number
  /**
   *  最小宽
   */
  minWidth?: string | number

  /**
   * @description  表单组件类型， el-input, el-select, el-radio等等
   */
  valueType?: FormItemValueType

  /**
   *@description  是否隐藏表单项(el-form-item)
   */
  hideInForm?: boolean | Ref<boolean> | ComputedRef<boolean>

  /**
   *@description  el-select，el-radio-group，el-checkbox-group 选项 ，支持数组，函数，和Promise
   */
  options?: OptionsType
  /**
   * @description  自定义状态显示逻辑 需要返回一个 OptionsRow
   * @param data
   * @returns
   */
  customGetStatus?: (data: { options: OptionsRow[]; value: string | number; row: RecordType }) => OptionsRow

  /** @description  在el-form-item的label展示tooltip提示信息 */
  tooltip?: ElTooltipProps | string

  /**
   *
   * @description  自定义渲染表格单行显示内容 需要返回一个 VNode，`render`的优先级最高
   * @example
   * ```ts
   * import { h } from 'vue'
   * import { ElTag } from 'element-plus'
   * import type { ZthFormProp } from '.'
   *
   * const tableColumns:ZthFormProp[] = [
   *  {
   *     label: 'tag',
   *     prop: 'tag',
   *     render: value => {
   *       const item = statusOptions.find(item => item.value === value)
   *        return h(ElTag, { type: item.type }, () => item.label)
   *     }
   *  }
   * ]
   *
   * ```
   */
  render?: (value: ModelValueType, data: { row: RecordType; column: ZthFormProp; index: number }) => VNode | string
}
/**
 * 表单项的props
 */
export interface BaseFormItemProps {
  /**
   * @description  传递给 el-form-item 的配置， 支持所有 el-form-item的props。值支持对象 object，computed，函数和 Promise。
   */
  formItemProps?: PropsItemType<Mutable<FormItemProps> & { [key: string]: any; style?: CSSProperties }>

  /**
   * @description  支持类似el-input，el-select等所有表单项的props 以及 表格显示的每行 props。值支持对象 object，computed，函数和 Promise。
   */
  fieldProps?: PropsItemType<FieldProps>

  /**
   * @description  el-col 的 props
   */
  colProps?: Partial<Mutable<ColProps>>

  /**
   * 表单中单个项目是否需要 label，默认undefined，优先级高于表单的整体 hasLabel
   */
  hasLabel?: boolean | Ref<boolean> | ComputedRef<boolean>

  /**
   * @description  使用渲染函数，自定义渲染 el-form-item 下的field-item组件。 
   * @example
   * ```ts
   * import { h } from 'vue'
   * import { ElTag } from 'element-plus'
   * import type { ZthFormItemProp } from '.'

   * const columns:ZthFormItemProp[]= [
   *  {
   *    label: '自定义el-input',
   *    prop: 'elData',
   *    fieldProps: {
   *     // 优先级低于 renderField 的props
   *      placeholder: '请输入'
   *    },
   *     renderField: (value, onChange) => {
   *        return h(ElInput as any, {
   *         // 优先级高于 fieldProps
   *           placeholder: '请输入自定义el-input',
   *           type: 'textarea',
   *           onChange
   *      })
   *  }
   * ]
   * 
   * ```
   */
  renderField?: (
    value: ModelValueType,
    onChange: (value: ModelValueType) => void,
    props: ZthFormItemProp,
  ) => VNode | string

  /**
   * @description  使用渲染函数，渲染el-form-item的label
   * @example
   * ```ts
   * import { ref, h } from 'vue'
   * import { ElButton } from 'element-plus'
   * import type { ZthFormItemProp } from '.'
   *
   * const columns: ZthFormItemProp[] = [
   *   {
   *    label: '名称',
   *    prop: 'name',
   *    renderLabel:() => 'renderExtra'
   *   },
   *   {
   *    label: '标签',
   *    prop: 'tag',
   *    renderLabel: () => h(ElButton,'tag')
   *   }
   * ]
   *
   * ```
   */
  renderLabel?: (label: string, props: ZthFormItemProp) => VNode | string

  /**
   * @description   使用渲染函数，渲染el-form-item 下一行额外的内容
   * @example
   * ```ts
   * import { ref, h } from 'vue'
   * import { ElButton } from 'element-plus'
   * import type { ZthFormItemProp } from '.'
   *
   * const columns: ZthFormItemProp[] = [
   *   {
   *    label: '名称',
   *    prop: 'name',
   *    renderExtra:() => 'renderExtra'
   *   },
   *   {
   *    label: '标签',
   *    prop: 'tag',
   *    renderExtra: () => h(ElButton,'tag')
   *   }
   * ]
   *
   * ```
   */
  renderExtra?: (column: ZthFormItemProp) => VNode | string

  /**
   * @description  使用渲染函数，传递表单组件的插槽，el-input，el-select等所有表单单项的插槽
   * @example
   * ```ts
   * import { ref, h } from 'vue'
   * import { Search } from '@element-plus/icons-vue'
   * import { ElIcon } from 'element-plus'
   * import type { ZthFormItemProp } from '.'
   *
   * const columns: ZthFormItemProp[] = [
   *  {
   *   label: '名称',
   *   prop: 'name',
   *   fieldSlots: {
   *     suffix: () => h(ElIcon, null, () => h(Search)),
   *     prefix: () => 'prefix',
   *     prepend: () => 'prepend',
   *     append: () => 'append'
   *   }
   *  },
   *  {
   *   label: '链接',
   *   prop: 'place',
   *   valueType: 'link',
   *   linkText: 'link',
   *   fieldSlots: {
   *     default: () => 'prefix'
   *   }
   *  },
   * ]
   *
   * ```
   */
  fieldSlots?: { [slotName: string]: (data?: any) => VNode | string }

  /**
   *
   * 自定义表单每一项子项的插槽 valueType 为 `checkbox` | `radio` | `select` |`plus-radio` 之一时生效。
   * el-checkbox-group下的，所有el-checkbox的内容整体插槽(即el-checkbox的default插槽)。
   * el-radio-group下的，所有el-checkbox的内容整体插槽(即el-radio的default插槽)。
   * el-select下的，所有el-option的内容整体插槽(即el-option的default插槽)。
   *
   * @see https://element-plus.org/zh-CN/component/checkbox.html#checkbox-slots
   * @see https://element-plus.org/zh-CN/component/radio.html#radio-slots
   * @see https://element-plus.gitee.io/zh-CN/component/select.html#option-slots
   */
  fieldChildrenSlot?: (option?: OptionsRow) => VNode | string
}
/**
 * 通用的整体表单值的类型
 */
export type ModelValues = Record<string, ModelValueType>

/**
 * @description  传递给 ZthForm的配置， 支持所有 el-form的props。值支持对象object。
 */
export type ZthFormProp = PropsItemType<PlusFormProps>

/**
 * @description  传递给 ZthFormItem的配置， 支持所有 el-form-item的props。及el-form-item子组件的props
 */
export interface ZthFormItemProp extends BaseFormItemProps, CommonType {}
