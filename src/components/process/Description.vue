<template>
  <div
    class="
      rounded-2xl
      my-4
      p-4
      border-2 border-stone-200
      w-7/12
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
      <div class="w-2/3">
        <h2 class="text-xl">Current Results</h2>
        <ProgressBar :options="options" />
      </div>
    </div>
  </div>
</template>

<script>
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
        percentages: [],
      },
    };
  },
};
</script>
