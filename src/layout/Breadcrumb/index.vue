<template>
  <el-breadcrumb :separator="parentRoute[0]?.children?.length ? '/' : ''">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item :key="parentRoute[0].path">
        <el-dropdown v-if="parentRoute[0]?.children" class="user-name" trigger="hover" @command="handleCommand">
          <span> {{ parentRoute[0].title }} </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item, index) in parentRoute[0].children" :key="index" :command="item.path">{{
                item.title
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-breadcrumb-item>
      <el-breadcrumb-item :key="route.meta.title" :to="{ path: route.path }">{{ route.meta.title }}</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { useParentRoute } from '@/hooks'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { parentRoute } = useParentRoute()

const handleCommand = (command: any) => {
  router.push({ path: command })
}
</script>
