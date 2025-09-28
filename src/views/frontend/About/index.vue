<template>
  <div class="p-5">
    <div class="flex justify-between h-[20rem]">
      <!-- 打字机 -->
      <div class="flex flex-col gap-4">
        <Typewriter :texts="aboutTexts" :speed="150" :pauseBetweenTexts="2500" />
        <p class="text-md">学无止境，保持学习100年。</p>
      </div>
      <!-- 侧边栏 -->
      <Sidebar class="hidden md:block" />
    </div>

    <!-- 我的项目 -->
    <div class="mt-2">
      <div class="text-2xl font-bold mb-6">我的项目</div>
      <div class="grid items-center grid-cols-1 lg:grid-cols-2 gap-6">
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