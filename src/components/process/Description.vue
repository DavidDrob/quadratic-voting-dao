<template>
  <div
    class="
      rounded-2xl
      my-4
      p-4
      border-2 border-stone-200
      w-8/12
      flex flex-col
      justify-between
    "
  >
    <div>
      <div class="pb-4">
        <h2 class="text-xl pb-2">{{ name }}</h2>
        <p>
          {{ description }}
        </p>
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/3">
        <h2 class="text-xl">Current Results</h2>
        <ProgressBar :results="results" />
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "md5";
import ProgressBar from "./ProgressBar.vue";

export default {
  name: "Voting Description",
  props: ["name", "description", "options"],
  components: {
    ProgressBar,
  },
  data() {
    return {
      results: {
        total: 0,
        percentages: [],
      },
    };
  },
  mounted() {},
  watch: {
    options(newValue, oldValue) {
      for (const key in newValue) {
        this.results.total += this.options[key].optionTotalVotes;
      }
      for (const key in newValue) {
        const votingPercentage =
          (this.options[key].optionTotalVotes * 100) / this.results.total;
        this.results.percentages.push({
          percentage: votingPercentage,
          color: md5(votingPercentage + "").substring(0, 6),
        });
      }
    },
  },
};
</script>
