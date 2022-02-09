<template>
  <div class="flex items-center">
    <textarea
      class="
        bg-transparent
        pl-4
        pt-2
        border-2 border-stone-200
        rounded-xl
        w-5/6
      "
      placeholder="option"
      v-model="optionText"
    />
    <SubmitButton @click="addToArray" title="Add" class="h-1/2 ml-4" />
  </div>
</template>

<script>
import SubmitButton from "../SubmitButton.vue";

export default {
  name: "Option Input",
  components: {
    SubmitButton,
  },
  data() {
    return {
      optionText: "",
    };
  },
  methods: {
    addToArray() {
      this.$emit("addOption", this.optionText);
      this.optionText = "";
    },
  },
};
</script>
