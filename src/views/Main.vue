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
    <router-link to="create" test="some value">
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
          <img class="w-12 h-12" src="../assets/sample.jpg" />
          <p class="font-semibold text-xl pl-3">Add a new DAO</p>
        </div>
        <div class="w-full px-4">
          <h2 class="font-light">Can't find the DAO you are looking for?</h2>
          <h3 class="font-medium">Click below and start a new voting</h3>
        </div>
        <div class="w-full py-6 flex justify-center">
          <router-link to="create" test="some value">
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
    if (daos.length > this.daoData.length) {
      for (const i in daos) {
        await this.$store.dispatch("getBasicDAOData", daos[i]);
      }
    }
  },
  computed: mapState(["daoData"]),
};
</script>