<script setup>
import { ref, watchEffect } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
// 引入 highlight.js 的 GitHub 样式
import 'highlight.js/styles/github.css';

// 1. 定义 Props
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
});

// 2. 创建两个 DOM 引用：一个给内容，一个给目录
const previewRef = ref(null);
const outlineRef = ref(null);

// 3. 使用 watchEffect 实现响应式渲染
watchEffect(() => {
  // 确保两个容器的 DOM 元素都已经挂载
  if (previewRef.value && outlineRef.value) {
    const markdownContent = props.content || '';

    // 配置
    Vditor.preview(previewRef.value, markdownContent, {
      hljs: {
        enable: true,
        style: 'github',
      },
      // anchor: 1 会为所有 h1-h6 标题添加一个錨点链接（id），
      anchor: 1,
      markdown: {
        toc: true,
        mark: true,
        footnotes: true,
      },
      after() {
        // 自动渲染目录
        Vditor.outlineRender(previewRef.value, outlineRef.value)
        if (outlineRef.value.innerText.trim() !== '') {
          outlineRef.value.style.display = 'block'
        }
      },
    });
  }
});
</script>

<template>
  <div class="vditor-preview-page">
    <div ref="outlineRef" class="outline"></div>
    <div ref="previewRef" class="preview"></div>
  </div>
</template>

<style scoped lang="scss">
.vditor-preview-page {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1rem;

  .outline {
    width: 250px;
    height: calc(100% - 50px);
    overflow: auto;
    border-radius: 0.5rem;
    --toolbar-icon-hover-color: var(--el-color-primary);
    --textarea-text-color: var(--el-text-color-primary);
    font-size: 0.8rem;
  }
}

@media screen and (max-width: 768px) {
  .vditor-preview-page {
    // 调整布局，只显示预览区域
    grid-template-columns: 1fr;
    .outline {
      // 确保目录在手机端隐藏，且不占据空间
      display: none !important;
    }
  }
  .preview{
    margin: 0 !important;
    padding: 0 !important;
  }
}
</style>