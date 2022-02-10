<template>
  <div class="w-2/3 m-auto mt-10">
    <a @click="$router.go(-1)" class="cursor-pointer">
      <DaoHead :name="headerData.name" :logo="headerData.logo" />
    </a>

    <div class="m-4 mt-8 flex flex-col justify-center">
      <h2 class="text-2xl w-full">Current Processes</h2>
      <div class="flex justify-between">
        <Description
          :name="currentVoting.name"
          :description="currentVoting.description"
          :options="currentVoting.options"
        />
        <Details
          :author="currentVoting.author"
          :limited="currentVoting.limited"
          :allowed="currentVoting.allowed"
          :start="currentVoting.start"
          :end="currentVoting.end"
          :symbol="headerData.symbol"
          :options="currentVoting.options"
          @ended="hasEnded"
        />
      </div>
    </div>

    <Options
      v-if="votingEnded == false"
      :options="currentVoting.options"
      :symbol="headerData.symbol"
      :title="currentVoting.name"
      :ended="votingEnded"
      :voted="currentVoting.voted"
    />
  </div>
</template>

<script>
import DaoHead from "../components/DaoHead.vue";
import Description from "../components/process/Description.vue";
import Details from "../components/process/Details.vue";
import Options from "../components/process/Options.vue";
import { mapState } from "vuex";

export default {
  name: "Voting Process",
  data() {
    return {
      headerData: {},
      currentVoting: {},
      votingEnded: false,
    };
  },
  components: {
    DaoHead,
    Description,
    Details,
    Options,
  },
  methods: {
    hasEnded(value) {
      this.votingEnded = value;
    },
  },
  async mounted() {
    if (this.daoData.length == 0)
      await this.$store.dispatch("getBasicDAOData", this.$route.params.address);

    for (const i in this.daoData) {
      if (this.daoData[i].address == this.$route.params.address) {
        this.headerData = this.daoData[i];
      }
    }
    const resp = await this.$store.dispatch(
      "getAllDAOVotings",
      this.$route.params.address
    );
    for (const i in resp.votings) {
      if (resp.votings[i].name == this.$route.params._id) {
        this.currentVoting = resp.votings[i];
      }
    }

    await this.$store.dispatch("getUsersGOVTokens", this.$route.params.address);
  },
  computed: mapState(["daoData"]),
};
</script>
