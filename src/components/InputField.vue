<template>
  <div class="flex justify-around">
    <input
      :type="type"
      class="
        w-1/2
        border-b-2 border-stone-800
        bg-stone-100
        pl-2
        focus:outline-none
        focus-visible:ring
      "
      placeholder="#"
    />
    <SubmitButton :title="title" />
  </div>
</template>

<script>
import SubmitButton from "./SubmitButton.vue";

export default {
  name: "InputField",
  props: ["type", "placeholder", "title"],
  components: {
    SubmitButton,
  },
};
</script>