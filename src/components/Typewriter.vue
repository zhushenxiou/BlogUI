<template>
  <p style="font-size: 2rem; min-height: 2rem;">
    <span>{{ typedText }}</span>
    <span class="cursor" :class="{ 'blink': isTyping || isEnd }"></span>
  </p>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 定义组件接收的 props
const props = defineProps({
  texts: {
    type: Array,
    default: () => []
  },
  speed: {
    type: Number,
    default: 150
  },
  pauseBetweenTexts: {
    type: Number,
    default: 2500 // 切换文本前的暂停时间，单位毫秒
  }
});

// 用于显示的响应式文本
const typedText = ref('');
// 是否正在打字
const isTyping = ref(true);
// 是否打字结束
const isEnd = ref(false);
// 当前显示的文本索引
const currentIndex = ref(0);
// 定时器引用
let typingTimer;
let pauseTimer;

const startTyping = () => {
  let index = 0;
  const currentText = props.texts[currentIndex.value];
  typedText.value = '';
  isTyping.value = true;
  isEnd.value = false;

  typingTimer = setInterval(() => {
    if (index < currentText.length) {
      // 逐个字符添加到显示文本中
      typedText.value += currentText.charAt(index);
      index++;
    } else {
      // 打字完成后清除定时器
      clearInterval(typingTimer);
      isTyping.value = false;
      isEnd.value = true;
      // 等待一段时间后切换到下一个文本
      pauseTimer = setTimeout(() => {
        currentIndex.value = (currentIndex.value + 1) % props.texts.length;
        startTyping();
      }, props.pauseBetweenTexts);
    }
  }, props.speed);
};

onMounted(() => {
  if (props.texts.length > 0) {
    startTyping();
  }
});

onUnmounted(() => {
  // 组件卸载时清除定时器
  if (typingTimer) clearInterval(typingTimer);
  if (pauseTimer) clearTimeout(pauseTimer);
});
</script>

<style scoped>
.cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: var(--text-select-color);
  margin-left: 2px;
  vertical-align: text-bottom;
}

.blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
