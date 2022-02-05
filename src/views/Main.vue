<template>
  <div class="w-2/3 m-auto flex justify-between items-center mt-24 flex-wrap">
    <DaoCard
      v-for="(dao, index) in daoData"
      :key="index"
      :title="dao.name"
      :logoUrl="dao.logo"
      :symbol="dao.symbol"
      :link="dao.address"
    />
    <!-- <DaoCard
      title="Add new DAO"
      logoUrl="dao.logo"
      symbol="Add"
      link="new"
    /> -->
  </div>
</template>

<script>
import DaoCard from "../components/DaoCard.vue";
import { mapState } from "vuex";
import { daos } from "../utils/daos.json";

export default {
  name: "EventCard",
  components: {
    DaoCard,
  },
  async mounted() {
    if (daos.length > this.daoData) {
      for (const daoAddress in daos) {
        await this.$store.dispatch("getBasicDAOData", daos[daoAddress]);
      }
    }
  },
  computed: mapState(["daoData"]),
};
</script>