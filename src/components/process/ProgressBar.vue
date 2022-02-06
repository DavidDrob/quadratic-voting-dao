<template>
  <div class="flex w-full">
    <div
      v-for="(option, index) in results.percentages"
      :key="index"
      class="h-5"
      :style="{
        width: option.percentage + '%',
        backgroundColor: '#' + option.color,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["results"],
};
</script>