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
      <div class="flex">
        <p>Voting %</p>
        <p title="Percentage of tokens spent in the voting">&nbsp; ?</p>
      </div>
      <p>{{ votingPercentageTotal }} %</p>
    </div>
    <div class="flex justify-between">
      <p>Limited</p>
      <p v-if="limited">Yes</p>
      <p v-else>No</p>
    </div>
    <!-- <hr class="mt-4 mb-2" />
    <p class="mb-2">Allowed voters</p> -->
    <!-- <Blockie v-for="(user, index) in allowed" :key="index" :address="user" /> -->
  </div>
</template>

<script>
import convertMS from "../../utils/convertMS";
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
      };
      this.formatedStart = new Date(Date.parse(this.start)).toLocaleDateString(
        "en-EN",
        options
      );
    },
    end(newValue, oldValue) {
      const end = new Date(this.end);
      this.remainingTime = new Date(this.end).getTime() - new Date().getTime();
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      this.formatedEnd = new Date(Date.parse(end)).toLocaleDateString(
        "en-EN",
        options
      );
    },
    limited(newValue, oldValue) {
      if (this.limited) {
        // get balances of allowed voters gov. tokens
        // see how many they could use to vote
        // return how much of the amount of votings tokens of all users were used in the voting
      }
    },
  },
  computed: {
    timeLeft() {
      if (this.remainingTime <= 0 && this.remainingTime != null) {
        this.$emit("ended", true);
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
    authorFormated() {
      if (this.author) return this.author.substring(0, 6) + "...";
    },
    ...mapState(["totalVotings", "tokenSupply"]),
  },
  async mounted() {
    await this.$store.dispatch("getAllDAOVotings", this.$route.params.address);
    await this.$store.dispatch("getTokenSupply", this.$route.params.address);

    for (const key in this.options) {
      // console.log(this.options);
      this.total += this.options[key].optionTotalVotes;
      // console.log(this.total);
    }
    this.$store.state.totalVotings = this.total;

    // Calculate how many tokens of the total supply were spent on the voting
    // console.log(this.total);
    // console.log(this.tokenSupply);

    this.votingPercentageTotal = (
      (this.totalVotings * 100) /
      this.tokenSupply
    ).toFixed(7);
  },
};
</script>
