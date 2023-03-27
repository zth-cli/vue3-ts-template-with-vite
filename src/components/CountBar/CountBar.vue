<template>
  <div class="count-bar-wrap">
    <div class="count-bar-main">
      <span
        v-for="(item, index) in options"
        :key="index"
        :class="['panel-item', modelValue === item.value ? 'gap-panel-active' : '']"
        @click="setActiveSatus(item)"
        >{{ item.label }}
        <template v-if="item.count !== undefined"> ({{ item.count }}) </template>
      </span>
    </div>
    <el-popover placement="bottom-end" :width="80" :visible="visible">
      <span
        v-for="(item, index) in options"
        :key="index"
        :class="['panel-item-mini', modelValue === item.value ? 'gap-panel-active' : '']"
        @click="setActiveSatus(item)"
      >
        {{ item.label }}
        <template v-if="item.count !== undefined"> ({{ item.count }}) </template>
      </span>
      <template #reference>
        <span class="panel-item panel-mini" @click="visible = true">
          {{ activeItem.label }}
          <template v-if="activeItem.count !== undefined"> ({{ activeItem.count }}) </template>
          <el-icon style="vertical-align: middle"><ArrowDown /></el-icon>
        </span>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { apiPost } from '@/api'
export interface Ioption {
  label: string
  value: any
  count?: number
}
export default defineComponent({
  name: 'CountBar',
  props: {
    modelValue: Number,
    options: {
      type: Array as PropType<Ioption[]>,
      required: true,
      default() {
        return [
          { label: '所有项目', value: 0, count: 10 },
          { label: '未完成', value: 1, count: 2 },
          { label: '未开始', value: 2, count: 3 },
          { label: '进行中', value: 3, count: 4 },
          { label: '已关闭', value: 4, count: 1 },
        ]
      },
    },
    dataUrl: {
      type: String,
      default: ``,
    },
    dataParams: {
      type: Object,
    },
  },
  emits: ['update:modelValue', 'on-click'],
  data() {
    return {
      visible: false,
      countObj: {},
    }
  },
  computed: {
    activeItem: function () {
      return this.options.filter((item) => item.value === this.modelValue)[0]
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      if (!this.dataUrl) {
        return
      }
      apiPost(this.dataUrl, this.dataParams).then((res) => {
        if (res.success) {
          res.data.rows.forEach((item: { type: any; count: any }) => {
            this.$set(this.countObj, item.type, item.count)
          })
        }
      })
    },
    setActiveSatus(data: any) {
      this.$emit('update:modelValue', data.value)
      this.$emit('on-click', data)
      this.visible = false
    },
  },
})
</script>
<style lang="scss">
.count-bar-wrap {
  display: inline-block;
  position: relative;
  .count-bar-main {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    .panel-item {
      font-size: 14px;
      padding: 6px 4px;
      margin-right: 22px;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
    }
    .gap-panel-active {
      border-bottom: 2px solid var(--color-primary);
    }
    @media screen and (max-width: 750px) {
      display: none;
    }
  }
  .panel-mini {
    display: none;
    font-size: 14px;
    padding: 6px 4px;
    margin-right: 12px;
    border-bottom: 2px solid transparent;
    cursor: pointer;
  }
  @media screen and (max-width: 750px) {
    .panel-mini {
      display: inline-block;
    }
  }
}
@media screen and (max-width: 750px) {
  .panel-item-mini {
    display: block;
  }
}
.panel-item-mini {
  font-size: 14px;
  padding: 6px 4px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}
</style>
