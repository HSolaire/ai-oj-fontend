<template>
  <a-row gutter="24">
    <!-- 左侧题库区 -->
    <a-col
      :xs="24"
      :md="16"
    >
      <a-card
        :bordered="false"
        class="problem-card"
      >
        <a-form
          layout="inline"
          @submit.prevent
          style="margin-bottom: 1.5rem"
        >
          <a-form-item label="标题">
            <a-input
              v-model:value="search.title"
              placeholder="请输入题目标题"
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

        <!-- <a-row
          class="problem-list-header"
          align="middle"
        >
          <a-col
            :span="1"
            class="problem-index"
          >
            序号
          </a-col>
          <a-col
            :span="15"
            class="problem-title"
          >
            题目名称
          </a-col>
          <a-col
            :span="3"
            class="problem-ac"
          >
            通过率
          </a-col>
          <a-col
            :span="1"
            class="problem-diff"
          >
            难度
          </a-col>
          <a-col
            :span="1"
            class="problem-fav"
          >
            收藏
          </a-col>
        </a-row> -->
        <a-list
          :data-source="filteredProblems"
          style="background: #fff"
        >
          <template #renderItem="{ item, index }">
            <a-list-item
              :class="{ 'zebra-row': index % 2 === 1, 'problem-list-item': true }"
              @click="goToProblem(item.id)"
            >
              <a-row class="problem-item-row">
                <a-col
                  :span="1"
                  class="problem-index"
                >
                  {{ index + 1 }}.
                </a-col>
                <a-col
                  :span="16"
                  class="problem-title"
                >
                  {{ item.title }}
                </a-col>
                <a-col
                  :span="2"
                  class="problem-ac flex justify-center"
                >
                  {{ item.acRate || '--' }}
                </a-col>
                <a-col
                  :span="1"
                  class="flex justify-center items-center"
                >
                  <a-tag
                    :color="difficultyColor(item.difficulty)"
                    class="problem-diff flex justify-center"
                  >
                    {{ item.difficulty }}
                  </a-tag>
                </a-col>

                <a-col
                  :span="1"
                  class="problem-fav flex justify-center"
                  @click.stop="toggleFav(item)"
                  :title="item.fav ? '取消收藏' : '收藏'"
                >
                  <template v-if="item.fav">★</template>
                  <template v-else>☆</template>
                </a-col>
              </a-row>
            </a-list-item>
          </template>
        </a-list>
      </a-card>
    </a-col>
    <!-- 右侧日历区 -->
    <a-col
      :xs="24"
      :md="8"
    >
      <a-card
        :bordered="false"
        class="calendar-card"
      >
        <div style="text-align: center; font-weight: bold; font-size: 1.2rem; margin-bottom: 1rem">
          本月做题日历
        </div>
        <a-calendar
          :fullscreen="false"
          :date-cell-render="dateCellRender"
        />
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import dayjs from 'dayjs';

  const router = useRouter();

  // mock题目数据
  const problems = ref([
    { id: 1, title: '两数之和', acRate: '90%', difficulty: '简单', fav: false },
    { id: 2, title: '最长回文子串', acRate: '45%', difficulty: '中等', fav: false },
    { id: 3, title: '合并区间', acRate: '60%', difficulty: '中等', fav: false },
    { id: 4, title: '接雨水', acRate: '28%', difficulty: '困难', fav: false },
    { id: 5, title: '爬楼梯', acRate: '85%', difficulty: '简单', fav: false },
    { id: 6, title: '二叉树的最大深度', acRate: '80%', difficulty: '简单', fav: false },
    { id: 7, title: '单词接龙', acRate: '18%', difficulty: '困难', fav: false },
  ]);

  const search = ref({ title: '', difficulty: '' });

  const filteredProblems = computed(() => {
    return problems.value.filter((item) => {
      const matchTitle = !search.value.title || item.title.includes(search.value.title);
      const matchDifficulty =
        !search.value.difficulty || item.difficulty === search.value.difficulty;
      return matchTitle && matchDifficulty;
    });
  });

  function onSearch() {}
  function onReset() {
    search.value = { title: '', difficulty: '' };
  }

  function difficultyColor(difficulty: string) {
    if (difficulty === '简单') return 'green';
    if (difficulty === '中等') return 'orange';
    if (difficulty === '困难') return 'red';
    return 'blue';
  }

  // mock做题记录（本月已做题的日期）
  const solvedDays = ref([1, 2, 5, 8, 12, 15, 18, 22, 28]);

  function dateCellRender(date: any) {
    const day = dayjs(date).date();
    if (solvedDays.value.includes(day)) {
      return '<span style="color: #52c41a; font-size: 1.2em;">✔</span>';
    }
    return null;
  }

  function goToProblem(id: number) {
    router.push(`/problems/${id}`);
  }

  function toggleFav(item: any) {
    item.fav = !item.fav;
  }
</script>
<style scoped>
  .problem-card {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    background: #fff;
  }
  .calendar-card {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    background: #fff;
  }
  .problem-item-row {
    gap: 2.2rem;
    width: 100%;
  }
  .problem-index {
    color: #999;
    text-align: right;
  }
  .problem-title {
    font-weight: 500;
  }
  .problem-ac {
    color: #888;
  }
  .problem-diff {
    text-align: center;
  }
  .problem-fav {
    cursor: pointer;
    font-size: 1.2em;
    user-select: none;
    color: #f7b500;
  }
  .problem-list-item {
    cursor: pointer;
    transition: background 0.2s;
  }
  .problem-list-item:hover {
    background: #f5f7fa;
  }
  .zebra-row {
    background: #fafbfc;
  }
  .problem-list-header {
    margin-bottom: 1rem;
  }
</style>
