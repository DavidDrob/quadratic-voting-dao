<template>
  <div class="flex w-full pt-2">
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
import { mapState } from "vuex";

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
      this.$store.state.totalVotings = this.results.total;
      for (const key in options) {
        const votingPercentage =
          (this.options[key].optionTotalVotes * 100) / this.results.total;
        this.results.percentages.push({
          percentage: votingPercentage,
          color: md5(this.options[key].optionName).substring(0, 6),
        });
      }
    },
  },
  computed: mapState(["totalVotings"]),
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