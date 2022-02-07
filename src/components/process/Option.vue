<template>
  <div>
    <div class="pb-4">
      <h2 class="text-xl pb-2">{{ name }}</h2>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "Voting Option",
  props: ["name", "votes"],
  //   computed: {
  //     voting: {
  //       get: function () {
  //         return this.votes;
  //       },
  //       set: function (value) {
  //         console.log(value);
  //         const votingObject = {
  //           name: this.name,
  //           votes: value,
  //         };
  //         this.$emit("update:votes", "votingObject");
  //       },
  //     },
  //   },
  methods: {
    voting() {
      const votingObject = {
        name: this.name,
        votes: this.votes,
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