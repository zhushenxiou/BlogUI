<template>
  <aside class="sidebar">
    <!-- 头像 -->
    <div class="avatar-container">
      <img class="avatar" src="@/assets/imgs/avatar.webp" alt="头像">
    </div>
    <!-- 名称 -->
    <h2 class="name">神秀</h2>
    <!-- 跳转链接 -->
    <div class="social-links">
      <a href="https://github.com/zhushenxiou" target="_blank" rel="noopener noreferrer">
        <img src="@/assets/imgs/github.png" alt="GitHub">
      </a>
      <a href="https://gitee.com/zhu-liang" target="_blank" rel="noopener noreferrer">
        <img src="@/assets/imgs/gitee.png" alt="Gitee">
      </a>
      <a href="https://space.bilibili.com/82655049?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer">
        <img src="@/assets/imgs/bilibili.png" alt="Bilibili">
      </a>
    </div>
    <!-- 自我介绍 -->
    <div class="introduction">
      <p> 是一枚Web前端开发，喜欢分享技术。 </p>
      <p> 前端：HTML、CSS、JS、Vue </p>
      <p> 后端：Spring Boot、Express、Egg.js </p>
      <p> 数据库：MySQL、MongoDB </p>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
  border: 1px solid var(--border-color);
  max-width: 20rem;
}

.avatar-container {
  margin-bottom: 1rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--text-select-color);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.social-links a img {
  width: 30px;
  height: 30px;
}

.introduction {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  p{
    color: var(--text-color);
  }
}
</style>
