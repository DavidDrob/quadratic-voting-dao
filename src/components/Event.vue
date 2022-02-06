<template>
  <div class="rounded-2xl my-4 p-4 border-2 border-stone-200">
    <div class="flex">
      <div class="pb-4 w-11/12">
        <h2 class="text-xl">{{ title }}</h2>
        <p class="pr-4">
          {{ description }}
        </p>
      </div>
      <div class="h-min">
        <h2 class="text-xl">Time left</h2>
        <p>{{ timeLeft }}</p>
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/3">
        <h2 class="text-xl">Current Results</h2>
        <ProgressBar :options="options" />
      </div>
      <router-link class="ml-auto" :to="this.$route.path + '/' + this.title">
        <SubmitButton title="Vote" />
      </router-link>
    </div>
  </div>
</template>

<script>
import SubmitButton from "../components/SubmitButton.vue";
import ProgressBar from "../components/process/ProgressBar.vue";
import convertMS from "../utils/convertMS";

export default {
  name: "DAO Page",
  data() {
    return {
      remainingTime: null,
    };
  },
  props: ["title", "description", "end", "options"],
  components: {
    SubmitButton,
    ProgressBar,
  },
  mounted() {
    const end = new Date(this.end);
    this.remainingTime = new Date().getTime() - end.getTime();
  },
  computed: {
    timeLeft() {
      if (this.remainingTime <= 0) {
        return "Voting ended";
      } else if (convertMS(this.remainingTime).day >= 2) {
        return `${convertMS(this.remainingTime).day} days`;
      } else if (
        convertMS(this.remainingTime).hour <= 1 &&
        convertMS(this.remainingTime).day > 1
      ) {
        return `${convertMS(this.remainingTime).minute} minutes`;
      } else {
        return `${convertMS(this.remainingTime).hour} hours`;
      }
    },
  },
};
</script>