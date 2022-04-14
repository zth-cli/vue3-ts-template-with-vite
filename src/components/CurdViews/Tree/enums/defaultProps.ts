export const defaultProps = {
  search: true,
  treeProps: () => {
    return { children: 'children', label: 'label' }
  },
  defaultExpandAll: false,
  expandOnclickNode: true,
}
