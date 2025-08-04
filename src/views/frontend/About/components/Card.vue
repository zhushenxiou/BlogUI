<template>
  <div class="card">
    <el-image :src="image" fit="cover" lazy class="img" />
    <div class="card__content">
      <p class="card__title">{{ title }}</p>
      <p class="card__description">{{ description }}</p>
      <el-link class="card__description" :href="link" target="_blank">{{ link }}</el-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
});

const { title, description, image, link } = props;

</script>

<style scoped lang="scss">
.card {
  position: relative;
  height: 20rem;
  background: var(--pink-color);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);

  .img {
    width: 100%;
    height: 100%;
  }

  // 嵌套 hover 状态样式
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

    .card__content {
      transform: translate(-50%, -50%) rotate(0deg);
      opacity: 1;
    }
  }

  // 嵌套卡片内容样式
  .card__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);

    // 嵌套标题样式
    .card__title {
      margin: 0;
      font-size: 24px;
      color: #333;
      font-weight: 700;
    }

    // 嵌套描述样式
    .card__description {
      margin: 10px 0 0;
      font-size: 14px;
      color: #777;
      line-height: 1.4;
    }
  }
}
</style>
