
<template>
  <div class="text-zinc-100">
    <div class="w-16 absolute top-2 right-2 font-bold">
      <p v-if="userAddress">
        {{ userAddress.substring(0, 6) }}
      </p>
      <img
        v-else
        @click="connectMetamask"
        src="./assets/metamask.png"
        class="cursor-pointer"
        alt="LOGIN WITH METAMASK"
      />
    </div>
    <main
      class="
        bg-gradient-to-tr
        from-emerald-500
        to-teal-600
        w-full
        grid
        place-items-center
        py-16
      "
    >
      <div class="flex flex-col items-center">
        <h1 class="text-4xl font-semibold text-center">
          <router-link to="/"> Covalent Quadratic Voting App </router-link>
        </h1>
        <h2 class="text-lg mt-6 border-b">
          <a
            href="https://www.radicalxchange.org/concepts/quadratic-voting/
        "
            >Learn more about quadratic voting here.
          </a>
        </h2>
      </div>
    </main>

    <router-view></router-view>
  </div>
</template>

<script>
import EventCardVue from "./components/EventCard.vue";
import DaoCard from "./components/DaoCard.vue";
import { mapState } from "vuex";
import { connect } from "./utils/ethersConnect";

export default {
  name: "EventCard",
  components: {
    EventCardVue,
    DaoCard,
  },
  async mounted() {
    this.$store.dispatch("getCurrentBlockHeight");
    this.connectMetamask();
  },
  methods: {
    async connectMetamask() {
      const address = await connect();
      this.$store.state.userAddress = address[0];
    },
  },
  computed: mapState(["blockHeight", "daoData", "userAddress"]),
};
</script>

<style>
body {
  background: rgb(21, 22, 24);
}
</style>