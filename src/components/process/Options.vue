<template>
  <div class="m-4 mt-8 flex flex-col justify-center">
    <h2 class="text-2xl w-full">Your voting credits</h2>
    <h2 class="text-lg w-full">{{ userTokens }} {{ symbol }}</h2>
    <h2 class="text-lg w-full">{{ userTokens - spent }} remaining</h2>
    <div
      class="
        rounded-2xl
        my-4
        p-4
        border-2 border-stone-200
        w-full
        flex flex-col
        justify-between
      "
    >
      <Option
        v-for="(option, index) in votingOptions"
        :key="index"
        :name="option.optionName"
        @updateVotingOptions="updateOptions"
      />
      <SubmitButton title="Submit" @click="confirmVoting" class="w-1/4" />
      <h1 v-if="success" class="font-semibold text-green-400 pt-2">
        You have successfuly voted! You're being redirected
      </h1>
    </div>
  </div>
</template>

<script>
import Option from "./Option.vue";
import SubmitButton from "../SubmitButton.vue";
import { mapState } from "vuex";

export default {
  name: "Options",
  components: {
    Option,
    SubmitButton,
  },
  props: ["options", "symbol", "title", "ended", "voted"],
  data() {
    return {
      votingOptions: {},
      userTokensOld: 0,
      spent: 0,
      votingName: "",
      alreadyVoted: [],
      success: false,
    };
  },
  methods: {
    updateOptions(value) {
      for (const i in this.votingOptions) {
        if (this.votingOptions[i].optionName == value.name) {
          this.votingOptions[i].optionTotalVotes = value.votes;
          this.votingOptions[i].creditsSpent = value.spent;

          this.spent = 0;
          this.votingOptions.forEach((element) => {
            if (element.creditsSpent) {
              this.spent += parseInt(element.creditsSpent);
            }
          });
        }
      }
    },
    async confirmVoting() {
      if (
        this.userTokens - this.spent >= 0 &&
        this.userTokens - this.spent < this.userTokens
      ) {
        if (this.ended === false) {
          if (this.alreadyVoted.includes(this.userAddress) == false) {
            this.success = true;
            const daoAddress = this.$route.params.address;
            const votingObject = this.votingOptions;
            const votingName = this.votingName;
            await this.$store.dispatch("postUsersVoting", {
              daoAddress,
              votingObject,
              votingName,
            });
          } else {
            alert("You have already voted");
          }
        } else {
          alert("Voting has already ended");
        }
      } else {
        alert("You spent too many voice credits!");
      }
    },
  },
  async mounted() {
    this.votingOptions = this.options;
    await this.$store.dispatch("getUsersGOVTokens", this.$route.params.address);
    // this.userTokensOld = this.$store.state.userTokens;
  },
  watch: {
    options(newValue, oldValue) {
      this.votingOptions = this.options;
      // this.userTokensOld = this.$store.state.userTokens;
    },
    title(newValue, oldValue) {
      this.votingName = this.title;
    },
    voted(newValue, oldValue) {
      this.alreadyVoted = this.voted;
    },
    totalVotings(newValue, oldValue) {},
    userTokens(newValue, oldValue) {},
    async userAddress(newValue, oldValue) {
      const response = await this.$store.dispatch(
        "getUsersGOVTokens",
        this.$route.params.address
      );
      // await this.$store.dispatch(
      //   "getUsersGOVTokens",
      //   this.$route.params.address
      // );
    },
  },
  computed: mapState(["totalVotings", "userTokens", "userAddress"]),
};
</script>
