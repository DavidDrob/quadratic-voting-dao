<template>
  <router-link :to="link">
    <div
      class="
        border-2 border-stone-200
        text-zinc-100
        cursor-pointer
        rounded-2xl
        w-60
        mb-4
        flex flex-col
        break-words
      "
    >
      <div class="flex w-full px-4 py-6 items-center">
        <img class="w-12 h-12" :src="getFullUrl" />
        <p class="font-semibold text-xl pl-3">{{ title }} ({{ symbol }})</p>
      </div>
      <div class="w-full px-4">
        <h2 class="font-light">voting processes</h2>
        <h3 class="font-medium">{{ totalVotings - endedVotings }} running</h3>
        <h3 class="font-medium">{{ endedVotings }} ended</h3>
      </div>
      <div class="w-full py-6 flex justify-center">
        <router-link :to="link">
          <!-- bind to `symbol` -->
          <SubmitButton title="Vote" />
        </router-link>
      </div>
    </div>
  </router-link>
</template>

<script>
import SubmitButton from "./SubmitButton.vue";

export default {
  name: "DaoCard",
  data() {
    return {
      totalVotings: 0,
      endedVotings: 0,
    };
  },
  props: ["logoUrl", "title", "symbol", "link"],
  components: {
    SubmitButton,
  },
  computed: {
    getFullUrl() {
      return this.logoUrl;
    },
  },
  async mounted() {
    const response = await this.$store.dispatch("getAllDAOVotings", this.link);

    // Check if voting has already ended
    this.totalVotings = response.votings.length;
    for (const voting in response.votings) {
      const voteEnding = new Date(response.votings[voting].end);
      if (Date.now() > voteEnding.getTime()) this.endedVotings += 1;
    }
  },
};
</script>
