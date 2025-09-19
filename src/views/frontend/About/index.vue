<template>
  <div class="frontend-about">
    <div class="header">
      <div class="info">
        <Typewriter :texts="aboutTexts" :speed="150" :pauseBetweenTexts="2500" />
        <p>学无止境，保持学习100年。</p>
      </div>
      <Sidebar class="desktop-sidebar" />
    </div>
    <div class="myProgram">
      <div class="title">我的项目</div>
      <div class="list">
        <Card v-for="item in programList" :key="item.title" :title="item.title" :description="item.description"
          :image="item.image" :link="item.link" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Typewriter from '@/components/Typewriter.vue';
import Sidebar from '@/components/Sidebar.vue';
import Card from './components/Card.vue';

// 关于我的介绍文本数组
const aboutTexts = [
  '您好，我是一名前端开发程序员。',
  '您好，我是一名游戏爱好者，怎么也玩不腻！',
];

const programList = [
  {
    title: '高仿网易云音乐项目',
    description: ' 本项目由vite+vue3+pinia+ts+element-plus写的高仿网易云音乐，实现了网易云音乐的主要功能。',
    image: 'https://i.imgs.ovh/2025/07/29/2VheX.png',
    link: 'https://gitee.com/zhu-liang/music-pc-terminal---front-end',
  },
  {
    title: '宝可梦信息管理系统',
    description: '本项目前端使用vite+vue3+pinia+ts+element-plus，后端使用egg.js + mysql，实现了宝可梦信息管理和用户权限管理。',
    image: 'https://i.imgs.ovh/2025/08/04/Y7orc.png',
    link: 'https://gitee.com/zhu-liang/pokenman-management-system',
  },
]
</script>

<style scoped lang="scss">
.frontend-about {
  padding: 20px;

  .header {
    display: flex;
    height: 20rem;
    justify-content: space-between;

    .info {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      p {
        font-size: 1.2rem;
      }
    }

    // 桌面端侧边栏样式
    .desktop-sidebar {
      display: block;
    }
  }

  .myProgram {
    .title {
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }

    .list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem;
    }
  }

  // 移动端媒体查询
  @media (max-width: 768px) {
    .header {
      .desktop-sidebar {
        display: none; // 隐藏侧边栏
      }
    }

    .myProgram {
      .list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-items: center;
      }
    }
  }
}
</style>
