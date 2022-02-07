<template>
  <div class="rounded-2xl my-4 p-4 border-2 border-stone-200 w-3/12">
    <div class="flex justify-between">
      <p>Author</p>
      <p>{{ author }}</p>
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
      <p>{{ totalVotings }} GTC</p>
    </div>
    <div class="flex justify-between">
      <p>Voting %</p>
      <p>12 %</p>
    </div>
    <div class="flex justify-between">
      <p>Limited</p>
      <p v-if="limited">Yes</p>
      <p v-else>No</p>
    </div>
    <hr class="mt-4 mb-2" />
    <p class="mb-2">Allowed voters</p>
    <!-- <Blockie v-for="(user, index) in allowed" :key="index" :address="user" /> -->
  </div>
</template>

<script>
import convertMS from "../../utils/convertMS";
import Blockie from "./Blockie.vue";
import { mapState } from "vuex";

export default {
  name: "Voting Details",
  props: ["author", "start", "end", "limited", "allowed"],
  components: {
    Blockie,
  },
  data() {
    return {
      formatedStart: "",
      formatedEnd: "",
      remainingTime: null,
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
      this.remainingTime = new Date().getTime() - end.getTime();
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      this.formatedEnd = new Date(Date.parse(this.end)).toLocaleDateString(
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
    ...mapState(["totalVotings"]),
  },
};
</script>
