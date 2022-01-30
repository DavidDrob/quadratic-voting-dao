<template>
  <div class="w-2/3 m-auto mt-10" style="height: 60%">
    <DaoHead />
    <div class="m-4 mt-8 flex flex-col justify-center">
      <h2 class="text-2xl">Current Processes</h2>
      <Event />
      <div
        class="
          rounded-2xl
          mt-4
          pl-4
          border-2 border-dashed
          h-36
          border-stone-200
          grid
          place-items-center
        "
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <!-- <h2 class="text-2xl my-8">Current Processes</h2>
      <Event /> -->
    </div>
  </div>
</template>

<script>
import Event from "../components/Event.vue";
import DaoHead from "../components/DaoHead.vue";

export default {
  name: "DAO Page",
  components: {
    Event,
    DaoHead,
  },
};
</script>
