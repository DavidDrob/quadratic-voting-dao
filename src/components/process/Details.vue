<template>
  <div class="rounded-2xl my-4 p-4 border-2 border-stone-200 w-4/12">
    <div class="flex justify-between">
      <p>Author</p>
      <p>{{ authorFormated }}</p>
    </div>
    <div class="flex justify-between">
      <p>Start</p>
      <p>{{ formatedStart }}</p>
    </div>
    <div class="flex justify-between">
      <p>End</p>
      <p>{{ formatedEnd }}</p>
    </div>
    <div class="flex justify-between">
      <p>Time left</p>
      <p>{{ timeLeft }}</p>
    </div>
    <div class="flex justify-between">
      <p>Total votes</p>
      <p>{{ totalVotings }} {{ symbol }}</p>
    </div>
    <div class="flex justify-between">
      <div class="flex" title="Percentage of tokens spent in the voting">
        <p>Voting %</p>
        <p class="text-xs">&nbsp; (?)</p>
      </div>
      <p>{{ votingPercentageTotal }} %</p>
    </div>
    <!-- <hr class="mt-4 mb-2" />
    <p class="mb-2">Allowed voters</p> -->
    <!-- <Blockie v-for="(user, index) in allowed" :key="index" :address="user" /> -->
  </div>
</template>

<script>
import Blockie from "./Blockie.vue";
import { mapState } from "vuex";

export default {
  name: "Voting Details",
  props: ["author", "start", "end", "limited", "allowed", "symbol", "options"],
  components: {
    Blockie,
  },
  data() {
    return {
      formatedStart: "",
      formatedEnd: "",
      remainingTime: null,
      votingPercentageTotal: 0,
      total: 0,
    };
  },
  watch: {
    start(newValue, oldValue) {
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      this.formatedStart = new Date(Date.parse(this.start)).toLocaleString(
        "en-EN",
        options
      );
    },
    end(newValue, oldValue) {
      const end = new Date(this.end);

      // Time til end of voting (miliseconds)
      this.remainingTime = new Date(this.end).getTime() - new Date().getTime();
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      this.formatedEnd = new Date(Date.parse(end)).toLocaleString(
        "en-EN",
        options
      );
    },
  },
  computed: {
    timeLeft() {
      if (this.remainingTime <= 0 && this.remainingTime != null) {
        this.$emit("ended", true);
        return "Voting ended";
      }
      // 2 weeks or more
      else if (this.remainingTime >= 1209600000) {
        return (
          Math.floor(Math.abs(this.remainingTime) / (1000 * 7 * 24 * 60 * 60)) +
          " weeks"
        );
      }
      // 24 hours or more
      else if (this.remainingTime >= 86400000) {
        return (
          Math.floor(Math.abs(this.remainingTime) / (1000 * 24 * 60 * 60)) +
          " days"
        );
      }
      // 2 hours or more
      else if (this.remainingTime >= 7200000) {
        return (
          Math.floor(Math.abs(this.remainingTime) / (1000 * 60 * 60)) + " hours"
        );
      }
      // 0 ms or more
      else if (this.remainingTime >= 0) {
        return (
          Math.floor(Math.abs(this.remainingTime) / (1000 * 60)) + " minutes"
        );
      }
    },
    authorFormated() {
      if (this.author) return this.author.substring(0, 6) + "...";
    },
    ...mapState(["totalVotings", "tokenSupply"]),
  },
  async mounted() {
    await this.$store.dispatch("getAllDAOVotings", this.$route.params.address);
    await this.$store.dispatch("getTokenSupply", this.$route.params.address);

    for (const key in this.options) {
      this.total += this.options[key].optionTotalVotes;
    }
    this.$store.state.totalVotings = this.total;

    this.votingPercentageTotal = (
      (this.totalVotings * 100) /
      this.tokenSupply
    ).toFixed(7);
  },
};
</script>
