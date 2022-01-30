<template>
  <header class="flex items-center">
    <img src="../assets/logo.png" class="w-16 h-16" />
    <h1 class="font-semibold text-lg pl-4">{{ $route.params.address }}</h1>
  </header>
</template>

<script>
export default {
  name: "DAO Head",
};
</script>