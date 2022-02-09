<template>
  <div>
    <div class="pb-4">
      <h2 class="text-xl pb-2">{{ name }}</h2>
      <div class="flex items-center">
        <div
          class="
            border-2 border-stone-200
            w-1/3
            h-8
            rounded-xl
            py-4
            flex
            items-center
            justify-around
          "
        >
          <button class="cursor-pointer w-1/6" @click="votes--">-</button>
          <div class="flex">
            <input
              type="number"
              v-model="votes"
              @change="voting"
              class="text-white bg-transparent w-8 -mr-4"
            />
          </div>
          <button class="cursor-pointer w-1/6" @click="votes++">+</button>
        </div>
        <p class="pl-4">{{ voiceCreditsSpent }} tokens spent on this voting</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Voting Option",
  props: ["name"],
  data() {
    return {
      voiceCreditsSpent: 0,
      votes: 0,
    };
  },
  methods: {
    voting() {
      if (this.votes < 0) {
        alert("The voting can't go below zero");
        this.votes = 0;
      }
      this.voiceCreditsSpent = Math.pow(this.votes, 2);

      const votingObject = {
        name: this.name,
        votes: this.votes,
        spent: this.voiceCreditsSpent,
      };
      this.$emit("updateVotingOptions", votingObject);
    },
  },
  watch: {
    votes(newValue, oldValue) {
      this.voting();
    },
  },
};
</script>