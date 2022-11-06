import { ElTree } from 'element-plus'
import { ref, unref } from 'vue'
/**
 * 展开或收起el-tree, 必须设置 default-expanded-keys
 * @param {*} tree
 * 参数为el-tree实例
 */
export const useExpandTree = () => {
  const expandArr = ref([])
  const expandBoolean = ref(false)
  // 展开收起树
  const expandTree = (tree: InstanceType<typeof ElTree>) => {
    expandBoolean.value = !expandBoolean.value
    const nodes = unref(tree).store.nodesMap
    for (const i in nodes) {
      nodes[i].expanded = expandBoolean.value
    }
  }
  return { expandTree, expandBoolean, expandArr }
}
