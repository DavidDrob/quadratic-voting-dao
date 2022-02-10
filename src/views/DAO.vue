<template>
  <div class="w-2/3 m-auto mt-10" style="height: 60%">
    <DaoHead :name="headerData.name" :logo="headerData.logo" />
    <div class="m-4 mt-8 flex flex-col justify-center">
      <h2 class="text-2xl">Current Processes</h2>
      <Event
        v-for="(voting, index) in daoVotings"
        :key="index"
        :title="voting.name"
        :description="voting.description"
        :end="voting.end"
        :options="voting.options"
      />
      <router-link to="create">
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
            class="w-10 h-10"
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
      </router-link>
      <!-- <h2 class="text-2xl my-8">Current Processes</h2>
      <Event /> -->
    </div>
  </div>
</template>

<script>
import Event from "../components/Event.vue";
import { mapState } from "vuex";
import DaoHead from "../components/DaoHead.vue";

export default {
  name: "DAO Page",
  data() {
    return {
      daoVotings: [],
      headerData: {},
    };
  },
  components: {
    Event,
    DaoHead,
  },
  async mounted() {
    if (this.daoData.length == 0)
      await this.$store.dispatch("getBasicDAOData", this.$route.params.address);

    for (const i in this.daoData) {
      if (this.daoData[i].address == this.$route.params.address) {
        this.headerData = this.daoData[i];
      }
    }

    // TODO: Check if there's a document for this DAO
    const votingResponse = await this.$store.dispatch(
      "getAllDAOVotings",
      this.$route.params.address
    );
    votingResponse.votings.sort((a, b) => {
      if (a.end > b.end) return -1;
      if (a.end < b.end) return 1;
      return 0;
    });
    this.daoVotings = votingResponse.votings;
  },
  computed: mapState(["daoData"]),
};
</script>
