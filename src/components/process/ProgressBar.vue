<template>
  <div class="flex w-full">
    <div
      v-for="(option, index) in results.percentages"
      :key="index"
      class="h-5"
      :style="{
        width: option.percentage + '%',
        backgroundColor: '#' + option.color,
      }"
    ></div>
  </div>
</template>

<script>
import md5 from "md5";

export default {
  props: ["options"],
  data() {
    return {
      results: {
        total: 0,
        percentages: [],
      },
    };
  },
  methods: {
    createBar(options) {
      for (const key in options) {
        this.results.total += this.options[key].optionTotalVotes;
      }
      for (const key in options) {
        const votingPercentage =
          (this.options[key].optionTotalVotes * 100) / this.results.total;
        this.results.percentages.push({
          percentage: votingPercentage,
          color: md5(votingPercentage + "").substring(0, 6),
        });
      }
    },
  },
  mounted() {
    this.createBar(this.options);
  },
  watch: {
    options(newValue, oldValue) {
      this.createBar(newValue);
    },
  },
};
</script>