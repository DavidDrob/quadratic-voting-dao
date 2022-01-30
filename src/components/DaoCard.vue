<template>
  <router-link :to="link">
    <div
      class="
        border-2 border-stone-200
        text-zinc-100
        cursor-pointer
        rounded-2xl
        w-60
        h-96
        flex
        justify-between
        py-6
        flex-col
        items-center
        break-words
      "
    >
      <div class="flex w-full px-4 items-center">
        <img class="w-12 h-12" :src="getFullUrl" />
        <p class="font-semibold text-xl pl-3" v-if="!isNotENS">{{ title }}</p>
        <p class="font-semibold text-xl pl-3" v-else>
          {{ `${title.substring(0, 5)} ... ${title.substring(38)}` }}
        </p>
      </div>
      <div class="w-full px-4">
        <h2 class="font-light">latest activity</h2>
        <h3 class="font-medium">01.01.1970</h3>
      </div>
      <div class="w-full px-4">
        <h2 class="font-light">voting processes</h2>
        <h3 class="font-medium">2 running</h3>
        <h3 class="font-medium">4 ended</h3>
      </div>
      <router-link :to="link">
        <SubmitButton :title="buttonTitle" />
      </router-link>
    </div>
  </router-link>
</template>

<script>
import SubmitButton from "./SubmitButton.vue";

export default {
  name: "DaoCard",
  props: ["logoUrl", "title", "buttonTitle", "link"],
  components: {
    SubmitButton,
  },
  computed: {
    getFullUrl() {
      return new URL(`../assets/${this.logoUrl}.png`, import.meta.url).href;
    },
    isNotENS() {
      if (this.title.substring(0, 2) == "0x" && this.title.length === 42)
        return true;
      return false;
    },
  },
};
</script>
