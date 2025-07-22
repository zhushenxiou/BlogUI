<template>
    <div class="article-card" @click="handleReadMore">
        <div class="title">
            {{ article.title }}
        </div>
        <div class="description">
            {{ description }}
        </div>
        <div class="info">
            <span class="time">{{ new Date(article.updated_at).toLocaleString() }}</span>
            <el-tag type="info" class="tag">{{ article.categoryName }}</el-tag>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

// 定义组件接收的属性
const props = defineProps({
    article: {
        type: Object,
        required: true,
        default: () => ({
            id: null,
            author: '作者名',
            categoryName: '分类名',
            title: '标题',
            content_summary: '内容',
            updated_at: '更新时间'
        })
    }
});
// 定义组件触发的事件
const emits = defineEmits(['read-more']);

// 计算属性，将 Markdown 内容转换为普通文本
const description = computed(() => {
    //  截取前 40 个字符, 并使用正则表达式移除 Markdown 语法
    const plainText = props.article.content_summary.substring(0, 40).replace(/[#*_`[\]()~-]/g, '').replace(/!\[.*?\]\(.*?\)/g, '').replace(/\[.*?\]\(.*?\)/g, '');
    // 截取前 20 个字符
    return plainText.substring(0, 20) + '...';
});

// 处理阅读全文点击事件
const handleReadMore = () => {
    emits('read-more', props.article.id);
};
</script>

<style scoped lang="scss">
.article-card {
    box-sizing: border-box;
    height: 10rem;
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    font-weight: bolder;
    padding: 1rem;

    &:hover {
        border: 1px solid var(--pink-color);
        transform: scale(1.05);

    }

    &:active {
        transform: scale(0.95) rotateZ(1.7deg);
    }

    .title {
        font-size: 1rem;
        color: var(--text-selected-color);
    }

    .description {
        font-size: 0.8rem;
        color: var(--text-color);
    }

    .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        font-size: 0.8rem;
        color: var(--text-color);
    }

}
</style>
