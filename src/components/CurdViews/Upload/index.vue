<template>
  <div>
    <el-upload v-bind="$attrs" list-type="picture-card" :http-request="uploadFile">
      <el-icon><Plus /></el-icon>
      <template #file="{ file }">
        <template v-if="getExtname(file.name)">
          <img class="el-upload-list__item-thumbnail" :src="getExtname(file.name)" :alt="file.name" />
        </template>
      </template>
    </el-upload>
  </div>
</template>
<script lang="ts">
import { apiUpload } from '@/api'
import { UploadRequestOptions } from 'element-plus'
export default defineComponent({
  name: 'ZthUpload',
  props: {
    modelValue: [Object, String],
    url: { type: String },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      extname: {
        word: ['doc', 'docx'],
        pdf: ['pdf'],
        excel: ['xls', 'xlsx', 'xlsm'],
      },
      extList: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'xlsm'],
    }
  },
  methods: {
    async uploadFile(params: UploadRequestOptions) {
      const { file } = params
      // 通过 FormData 对象上传文件
      const formData = new FormData()
      formData.append('file', file)
      const response = await apiUpload(this.url, formData)
      if (response.success) {
        this.$emit('update:modelValue', { fileName: file.name, ...response.data })
      } else {
        this.$emit('update:modelValue', '')
      }
    },
    getExtname(fileName: string) {
      const extname = fileName.split('.').slice(-1)[0]
      let path = ''
      if (this.extList.includes(extname)) {
        for (const key in this.extname) {
          if (this.extname[key].includes(extname)) {
            path = key
            break
          }
        }
      }
      return this.getImageUrl(path)
    },
    getImageUrl(name: string) {
      return new URL(`./img/${name}.png`, import.meta.url).href
    },
  },
})
</script>
