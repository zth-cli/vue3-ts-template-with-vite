/*
 * @Author: 阮志雄
 * @Date: 2021-11-24 11:06:25
 * @LastEditTime: 2021-11-27 20:52:13
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-template-with-ts\src\components\CurdViews\CurdTable\enums\defaultProps.ts
 */
export const defaulltProps = {
  columns: () => [{ label: '菜单名称', prop: 'id', align: 'center' }],
  tableSize: 'mini',
  mode: 'normal',
  defaultPanel: () => ['add', 'edit', 'delete'],
  pageAlign: 'right',
  pageSize: 20,
  pageIndex: 1,
  showSettingToolbar: true,
  showPage: true,
  highlightCurrentRow: false,
  lazy: false,
  height: '71vh',
  border: true,
  showSummary: false,
  stripe: true,
  showSettingTool: true,
  showPanelTool: true,
  responseName: () => 'list',
  isPrivate: false
}
