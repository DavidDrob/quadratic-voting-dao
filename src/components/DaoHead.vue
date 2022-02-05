<template>
  <header class="flex items-center">
    <img :src="logo" class="w-16 h-16" />
    <h1 class="font-semibold text-lg pl-4">{{ name }}</h1>
  </header>
</template>

<script>
export default {
  name: "DAO Head",
  props: ["name", "logo"],
};
</script>