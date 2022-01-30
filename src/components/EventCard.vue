<template>
  <aside
    class="
      bg-stone-100
      rounded-2xl
      w-60
      h-96
      flex
      justify-between
      py-8
      flex-col
      items-center
    "
  >
    <p class="font-semibold text-xl">{{ title }}</p>
    <img alt="Vue logo" class="w-32 h-32" :src="getFullUrl" />
    <SubmitButton v-if="type === 'submit'" :title="buttonTitle" />
    <InputField
      v-else-if="type === 'number'"
      :title="buttonTitle"
      :type="type"
    />
  </aside>
</template>

<script>
import SubmitButton from "./SubmitButton.vue";
import InputField from "./InputField.vue";

export default {
  name: "EventCard",
  props: ["title", "imageName", "buttonTitle", "type"],
  components: {
    SubmitButton,
    InputField,
  },
  computed: {
    getFullUrl() {
      return new URL(`../assets/${this.imageName}.png`, import.meta.url).href;
    },
  },
};
</script>
