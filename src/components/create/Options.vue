<template>
  <div class="flex">
    <div class="border-2 border-stone-200 rounded-xl w-5/6 py-2 pl-4 mb-4">
      <p class="break-words">{{ title }}</p>
    </div>
    <SubmitButton class="h-1/2 ml-4" title="X" @click="remove" />
  </div>
</template>

<script>
import SubmitButton from "../SubmitButton.vue";

export default {
  name: "Options",
  props: ["title"],
  components: {
    SubmitButton,
  },
  methods: {
    remove() {
      this.$emit("removeOption", this.title);
    },
  },
};
</script>
