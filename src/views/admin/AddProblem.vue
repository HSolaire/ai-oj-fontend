<template>
  <a-card title="新增题目" style="max-width: 600px; margin: 0 auto;">
    <a-form layout="vertical">
      <a-form-item label="题目标题" required>
        <a-input v-model:value="form.title" placeholder="请输入题目标题" />
      </a-form-item>
      <a-form-item label="标签（用逗号分隔）">
        <a-input v-model:value="form.tags" placeholder="如：数组,动态规划" />
      </a-form-item>
      <a-form-item label="难度" required>
        <a-select v-model:value="form.difficulty" placeholder="请选择难度">
          <a-select-option value="简单">简单</a-select-option>
          <a-select-option value="中等">中等</a-select-option>
          <a-select-option value="困难">困难</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="题目描述">
        <a-textarea v-model:value="form.description" rows="5" placeholder="请输入题目描述" />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="onSubmit">提交</a-button>
          <a-button @click="onBack">返回</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const form = ref({
  title: '',
  tags: '',
  difficulty: '',
  description: '',
})

function onSubmit() {
  if (!form.value.title || !form.value.difficulty) {
    message.warning('请填写必填项')
    return
  }
  message.success('题目已模拟提交！')
  router.back()
}
function onBack() {
  router.back()
}
</script> 