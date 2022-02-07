<template>
  <div class="m-4 mt-8 flex flex-col justify-center">
    <h2 class="text-2xl w-full">Your voting credits</h2>
    <h2 class="text-lg w-full">55 GTC</h2>
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
      <Option
        v-for="(option, index) in options"
        :key="index"
        :name="option.optionName"
        :votes="option.optionTotalVotes"
        @updateVotingOptions="updateOptions"
      />
      <SubmitButton title="Submit" class="w-1/4" />
    </div>
  </div>
</template>

<script>
import Option from "./Option.vue";
import SubmitButton from "../SubmitButton.vue";
export default {
  name: "Options",
  components: {
    Option,
    SubmitButton,
  },
  props: ["options"],
  data() {
    return {
      votingOptions: {},
    };
  },
  methods: {
    updateOptions(value) {
      console.log(value);
      for (const i in this.votingOptions) {
        if (this.votingOptions[i].optionName == value.name) {
          this.votingOptions[i].optionTotalVotes = value.votes;
        }
      }
    },
  },
  mounted() {
    this.votingOptions = this.options;
  },
  watch: {
    options(newValue, oldValue) {
      this.votingOptions = this.options;
    },
  },
};
</script>
