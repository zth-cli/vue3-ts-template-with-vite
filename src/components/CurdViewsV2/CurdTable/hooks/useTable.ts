import { TableStateProps, Pageable } from '..'
import { reactive, computed, toRefs } from 'vue'

/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法
 * @param {Object} initParam 获取数据初始化参数
 * @param {Boolean} isPageable 是否有分页
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法
 * */
export const useTable = (
  api: (params: any) => Promise<any>,
  initParam: object = {},
  isPageable = true,
  dataCallBack?: (data: any) => any
) => {
  const state = reactive<TableStateProps>({
    tableData: [{ id: 1 }, { id: 2 }],
    pageParams: {
      pageIndex: 1,
      pageSize: 10,
      total: 0,
    },
    searchParam: {},
    totalParam: {},
  })

  const pageParam = computed(() => {
    return isPageable
      ? {
          pageIndex: state.pageParams.pageIndex,
          pageSize: state.pageParams.pageSize,
        }
      : {}
  })

  // 获取表格数据
  const queryTableData = async () => {
    try {
      // 先把初始化参数和分页参数放到总参数里面
      Object.assign(state.totalParam, initParam, unref(pageParam))
      let { data } = await api(state.totalParam)
      dataCallBack && (data = dataCallBack(data))
      state.tableData = data.list

      // 更新总条数
      const { total } = data
      isPageable && state.pageParams.total !== total && (state.pageParams.total = total)
    } catch (error) {
      console.warn(error)
    }
  }

  // 更新查询参数
  const updatedTotalParam = () => {
    state.totalParam = {}
    // 处理查询参数，可以给查询参数加自定义前缀操作
    const nowSearchParam: { [key: string]: any } = {}
    // 防止手动清空输入框携带参数
    for (const key in state.searchParam) {
      if (!['', null, undefined].includes(state.searchParam[key])) {
        nowSearchParam[key] = state.searchParam[key]
      }
    }
    Object.assign(state.totalParam, nowSearchParam, unref(pageParam))
  }

  // 表格数据查询
  const searchHandle = () => {
    state.pageParams.pageIndex = 1
    updatedTotalParam()
    queryTableData()
  }

  // 表格数据重置
  const resetHandle = () => {
    state.pageParams.pageIndex = 1
    state.searchParam = {}
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    Object.keys(initParam).forEach((key) => {
      state.searchParam[key] = initParam[key]
    })
    updatedTotalParam()
    queryTableData()
  }

  // 分页, 每页条数改变
  const handleSizeChange = (pageSize: number) => {
    state.pageParams.pageIndex = 1
    state.pageParams.pageSize = pageSize
    queryTableData()
  }

  // 分页, 当前页改变
  const handleCurrentChange = (pageIndex: number) => {
    state.pageParams.pageIndex = pageIndex
    queryTableData()
  }

  return {
    ...toRefs(state),
    queryTableData,
    searchHandle,
    resetHandle,
    handleSizeChange,
    handleCurrentChange,
    updatedTotalParam,
  }
}
