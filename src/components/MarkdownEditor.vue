<template>
  <div ref="vditorRef" class="vditor-wrapper"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

// 1. 定义 props 和 emits，实现 v-model
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  height: {
    type: Number,
    default: 500,
  },
  placeholder: {
    type: String,
    default: '在这里输入 Markdown 内容...',
  },
});

const emit = defineEmits(['update:modelValue']);

// 2. 创建 DOM 引用和 Vditor 实例引用
const vditorRef = ref(null);
const vditorInstance = ref(null);

// 3. 在 onMounted 钩子中初始化 Vditor
onMounted(() => {
  vditorInstance.value = new Vditor(vditorRef.value, {
    width: '100%',
    height: props.height,
    placeholder: props.placeholder,
    mode: 'sv', // 分屏预览模式
    cache: {
      enable: false, // 关闭缓存
    },
    // 精简后的工具栏
    toolbar: [
      'headings', 'bold', 'italic', 'strike', '|',
      'list', 'ordered-list', 'check', '|',
      'quote', 'line', 'code', 'inline-code', '|',
      'upload', 'link', 'table', '|',
      'preview', 'fullscreen', 'edit-mode'
    ],
    after: () => {
      // 实例创建后，设置初始值
      if (props.modelValue) {
        vditorInstance.value.setValue(props.modelValue);
      }
    },
    // 监听输入，并通过 emit 更新 v-model
    input: (value) => {
      emit('update:modelValue', value);
    },
  });
});

// 4. 组件卸载前销毁 Vditor 实例，防止内存泄漏
onBeforeUnmount(() => {
  if (vditorInstance.value) {
    vditorInstance.value.destroy();
  }
});

// 5. 监听外部对 modelValue 的修改，并同步到编辑器
watch(
  () => props.modelValue,
  (newValue) => {
    // 避免初始化时或由内部输入emit触发的重复赋值
    // 只有当外部值变化且与编辑器内部值不同时才更新
    if (vditorInstance.value && newValue !== vditorInstance.value.getValue()) {
      vditorInstance.value.setValue(newValue);
    }
  }
);
</script>

<style scoped>
.vditor-wrapper {
  width: 100%;
  /* 你可以在这里添加一些自定义样式，比如边框 */
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>