<template>
  <button
    class="
      px-6
      py-2
      rounded-2xl
      border-2 border-stone-200
      hover:border-stone-300
      hover:bg-stone-200
      hover:text-stone-600
      hover:ease-in
      transition
      duration-300
      ease-out
      hover:scale-110
    "
  >
    <p class="font-semibold">{{ title }}</p>
  </button>
</template>

<script>
export default {
  name: "SubmitButton",
  props: ["title"],
};
</script>