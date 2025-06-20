<template>
  <!-- 搜索栏 -->
  <a-card
    borderd
    class="admin-card"
    style="margin-bottom: 1.5rem"
  >
    <a-form
      layout="inline"
      @submit.prevent
    >
      <a-form-item label="标题">
        <a-input
          v-model:value="search.title"
          placeholder="请输入题目标题"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="标签">
        <a-input
          v-model:value="search.tags"
          placeholder="请输入标签（如：动态规划）"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="难度">
        <a-select
          v-model:value="search.difficulty"
          allow-clear
          placeholder="请选择难度"
          style="width: 120px"
        >
          <a-select-option value="简单">简单</a-select-option>
          <a-select-option value="中等">中等</a-select-option>
          <a-select-option value="困难">困难</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          @click="onSearch"
        >
          搜索
        </a-button>
        <a-button
          style="margin-left: 8px"
          @click="onReset"
        >
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>

  <!-- 表格区 -->
  <a-card
    :bordered="false"
    class="admin-card"
    borderd
  >
    <a-row>
      <a-button
        type="primary"
        @click="goAdd"
      >
        新增题目
      </a-button>
    </a-row>
    <a-row>
      <a-table
        :columns="columns"
        :data-source="pagedData"
        :pagination="false"
        row-key="id"
        style="margin-top: 1re; width: 100%"
        bordered
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'index'">
            {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
          </template>
          <template v-else-if="column.dataIndex === 'tags'">
            <a-tag
              v-for="tag in record.tags"
              :key="tag"
            >
              {{ tag }}
            </a-tag>
          </template>
          <template v-else-if="column.dataIndex === 'difficulty'">
            <a-tag :color="difficultyColor(record.difficulty)">{{ record.difficulty }}</a-tag>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-space>
              <a-button
                type="link"
                @click="onEdit(record)"
              >
                编辑
              </a-button>
              <a-popconfirm
                title="确定删除该题目吗？"
                @confirm="onDelete(record)"
              >
                <a-button
                  type="link"
                  danger
                >
                  删除
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
          <template v-else>
            {{ record[column.dataIndex] }}
          </template>
        </template>
      </a-table>
    </a-row>
    <!-- 分页区 -->
    <a-row
      justify="end"
      style="margin-top: 2rem"
    >
      <a-col>
        <a-pagination
          v-model:current="pagination.current"
          :total="filteredData.length"
          :page-size="pagination.pageSize"
          show-size-changer
          :page-size-options="[5, 10, 20, 50]"
          @change="onPageChange"
          @showSizeChange="onPageSizeChange"
          class="admin-pagination"
        />
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';

  const router = useRouter();

  // mock数据
  const mockProblems = ref([
    {
      id: 1,
      title: '两数之和',
      tags: ['数组', '哈希表'],
      difficulty: '简单',
      createdAt: '2024-05-01',
      creator: 'admin',
      updatedAt: '2024-05-10',
    },
    {
      id: 2,
      title: '最长回文子串',
      tags: ['字符串', '动态规划'],
      difficulty: '中等',
      createdAt: '2024-05-02',
      creator: 'admin',
      updatedAt: '2024-05-11',
    },
    {
      id: 3,
      title: '合并区间',
      tags: ['数组', '排序'],
      difficulty: '中等',
      createdAt: '2024-05-03',
      creator: 'admin',
      updatedAt: '2024-05-12',
    },
    {
      id: 4,
      title: '接雨水',
      tags: ['栈', '双指针'],
      difficulty: '困难',
      createdAt: '2024-05-04',
      creator: 'admin',
      updatedAt: '2024-05-13',
    },
    {
      id: 5,
      title: '爬楼梯',
      tags: ['动态规划'],
      difficulty: '简单',
      createdAt: '2024-05-05',
      creator: 'admin',
      updatedAt: '2024-05-14',
    },
    {
      id: 6,
      title: '二叉树的最大深度',
      tags: ['树', '深度优先搜索'],
      difficulty: '简单',
      createdAt: '2024-05-06',
      creator: 'admin',
      updatedAt: '2024-05-15',
    },
    {
      id: 7,
      title: '单词接龙',
      tags: ['广度优先搜索'],
      difficulty: '困难',
      createdAt: '2024-05-07',
      creator: 'admin',
      updatedAt: '2024-05-16',
    },
  ]);

  const search = ref({
    title: '',
    tags: '',
    difficulty: '',
  });

  const pagination = ref({
    current: 1,
    pageSize: 5,
  });

  const columns = [
    { title: '序号', dataIndex: 'index', key: 'index', width: 70 },
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '标签', dataIndex: 'tags', key: 'tags' },
    { title: '难度', dataIndex: 'difficulty', key: 'difficulty', width: 90 },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 120 },
    { title: '创建者', dataIndex: 'creator', key: 'creator', width: 100 },
    { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt', width: 120 },
    { title: '操作', dataIndex: 'action', key: 'action', width: 120, fixed: 'right' },
  ];

  function difficultyColor(difficulty: string) {
    if (difficulty === '简单') return 'green';
    if (difficulty === '中等') return 'orange';
    if (difficulty === '困难') return 'red';
    return 'blue';
  }

  const filteredData = computed(() => {
    return mockProblems.value.filter((item) => {
      const matchTitle = !search.value.title || item.title.includes(search.value.title);
      const matchTags =
        !search.value.tags || item.tags.some((tag) => tag.includes(search.value.tags));
      const matchDifficulty =
        !search.value.difficulty || item.difficulty === search.value.difficulty;
      return matchTitle && matchTags && matchDifficulty;
    });
  });

  const pagedData = computed(() => {
    const start = (pagination.value.current - 1) * pagination.value.pageSize;
    const end = start + pagination.value.pageSize;
    return filteredData.value.slice(start, end);
  });

  function onSearch() {
    pagination.value.current = 1;
  }
  function onReset() {
    search.value = { title: '', tags: '', difficulty: '' };
    pagination.value.current = 1;
  }
  function onPageChange(page: number) {
    pagination.value.current = page;
  }
  function onPageSizeChange(current: number, size: number) {
    pagination.value.pageSize = size;
    pagination.value.current = 1;
  }
  function onEdit(record: any) {
    message.info(`模拟编辑题目：${record.title}`);
  }
  function onDelete(record: any) {
    mockProblems.value = mockProblems.value.filter((item) => item.id !== record.id);
    message.success('删除成功');
  }
  function goAdd() {
    router.push('/admin/add');
  }
</script>

<style scoped>
  .admin-pagination :deep(.ant-select) {
    min-width: 9rem;
  }
  .admin-card {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    background: #fff;
  }
</style>
