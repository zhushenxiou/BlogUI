<template>
  <aside class="max-w-[20rem] border border-[var(--border-color)] text-center p-4 rounded-lg">
    <!-- 头像 -->
    <div class="flex justify-center mb-4">
      <img class="w-[100px] h-[100px] rounded-full object-cover" src="@/assets/imgs/avatar.webp" alt="头像">
    </div>
    <!-- 名称 -->
    <h2 class="text-2xl font-bold text-[var(--text-select-color)] mb-4">神秀</h2>
    <!-- 跳转链接 -->
    <div class="flex justify-center gap-4 mb-4">
      <a href="https://github.com/zhushenxiou" target="_blank" rel="noopener noreferrer" class="w-8 h-8">
        <img src="@/assets/imgs/github.png" alt="GitHub">
      </a>
      <a href="https://gitee.com/zhu-liang" target="_blank" rel="noopener noreferrer" class="w-8 h-8">
        <img src="@/assets/imgs/gitee.png" alt="Gitee">
      </a>
      <a href="https://space.bilibili.com/82655049?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer" class="w-8 h-8">
        <img src="@/assets/imgs/bilibili.png" alt="Bilibili">
      </a>
    </div>
    <!-- 自我介绍 -->
    <div class="flex flex-col items-center gap-2">
      <p class="text-[var(--text-color)]"> 是一枚Web前端开发，喜欢分享技术。 </p>
    </div>
  </aside>
</template>
