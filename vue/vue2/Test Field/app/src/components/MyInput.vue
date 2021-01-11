<template>
    <div class="my-input">
        <template slot="suffix">123</template>
    </div>
</template>

<script>
/*
    通过 vm.$attrs 和 vm.$listeners 实现对 a-input 的扩展
        vm.$attrs：属性列表
            v-bind="$attrs"
        vm.$listeners：事件监听
            v-on="$listeners"
*/
export default {};
</script>

<style></style>
