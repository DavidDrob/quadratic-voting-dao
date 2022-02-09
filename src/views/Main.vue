<template>
  <div
    class="w-2/3 m-auto flex justify-center md:justify-between mt-24 flex-wrap"
  >
    <DaoCard
      v-for="(dao, index) in daoData"
      :key="index"
      :title="dao.name"
      :logoUrl="dao.logo"
      :symbol="dao.symbol"
      :link="dao.address"
    />
    <router-link to="create">
      <div
        class="
          border-2 border-stone-200
          text-zinc-100
          cursor-pointer
          rounded-2xl
          w-60
          mb-4
          flex flex-col
          break-words
        "
      >
        <div class="flex w-full px-4 py-6 items-center">
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
          <p class="font-semibold text-xl pl-3">Add a new DAO</p>
        </div>
        <div class="w-full px-4">
          <h2 class="font-light">Can't find the DAO you are looking for?</h2>
          <h3 class="font-medium">Click below and start a new voting</h3>
        </div>
        <div class="w-full py-6 flex justify-center">
          <router-link to="create">
            <!-- bind to `symbol` -->
            <SubmitButton title="Add" />
          </router-link>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import DaoCard from "../components/DaoCard.vue";
import SubmitButton from "../components/SubmitButton.vue";
import { mapState } from "vuex";
import { daos } from "../utils/daos.json";

export default {
  name: "EventCard",
  components: {
    DaoCard,
    SubmitButton,
  },
  async mounted() {
    for (const i in daos) {
      if (daos.length > this.daoData.length) {
        await this.$store.dispatch("getBasicDAOData", daos[i]);
      }
    }
  },
  computed: mapState(["daoData"]),
};
</script>