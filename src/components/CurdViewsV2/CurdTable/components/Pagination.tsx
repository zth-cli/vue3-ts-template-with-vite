import { Pageable } from '@/components/CurdViewsV2'
export interface PaginationProps {
  pageable: Pageable
  handleSizeChange: (size: number) => void
  handleCurrentChange: (currentPage: number) => void
}
export const Pagination = defineComponent({
  name: 'Pagination',
  props: {
    pageable: {
      type: Object as PropType<Pageable>,
      required: true,
    },
    handleSizeChange: {
      type: Function as PropType<(size: number) => void>,
      required: true,
    },
    handleCurrentChange: {
      type: Function as PropType<(currentPage: number) => void>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <el-pagination
        current-page={props.pageable.pageIndex}
        page-size={props.pageable.pageSize}
        page-sizes={[10, 25, 50, 100]}
        background={true}
        layout='total, sizes, prev, pager, next, jumper'
        total={props.pageable.total}
        onSizeChange={props.handleSizeChange}
        onCurrentChange={props.handleCurrentChange}></el-pagination>
    )
  },
})
