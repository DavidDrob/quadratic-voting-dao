
<template>
  <div class="text-zinc-100">
    <div class="fixed left-2 bottom-2">
      <select
        class="bg-stone-700"
        v-model="chainIDLocal"
        @change="networkChangeByUser"
      >
        <option value="1">Eth</option>
        <option value="42">Kovan</option>
        <option value="137">Polygon (matic)</option>
        <option value="56">BSC</option>
      </select>
    </div>
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
import DaoCard from "./components/DaoCard.vue";
import { mapState } from "vuex";
import { connect } from "./utils/ethersConnect";

export default {
  name: "App",
  components: {
    DaoCard,
  },
  data() {
    return {
      chainIDLocal: 1,
      daos: [],
    };
  },
  // async mounted() {
  //   this.$store.dispatch("getCurrentBlockHeight");
  // },
  methods: {
    async connectMetamask() {
      const address = await connect();
      if (address) this.$store.state.userAddress = address[0];
    },
    networkChangeByUser() {
      this.networkChange();
      if (this.$route.params.address) {
        window.location.href = "/";
      }
    },
    async networkChange() {
      if (this.chainIDLocal == null) {
        localStorage.setItem("chainId_qv", 1);
        this.$store.state.chainId = 1;
      } else {
        localStorage.setItem("chainId_qv", this.chainIDLocal);
        this.$store.state.chainId = this.chainIDLocal;
      }
      await this.getBasicDaoData();
    },
    async getBasicDaoData() {
      this.daos = [];
      const response = await this.$store.dispatch("getAllDAOs");
      response.forEach((dao) => {
        this.daos.push(dao.daoAddress);
      });
      this.$store.state.daoData = [];
      for (const i in this.daos) {
        await this.$store.dispatch("getBasicDAOData", this.daos[i]);
      }
    },
  },
  mounted() {
    this.chainIDLocal = localStorage.getItem("chainId_qv");
    this.connectMetamask();
    this.networkChange();
  },
  computed: mapState(["blockHeight", "daoData", "userAddress"]),
};
</script>

<style>
body {
  background: rgb(21, 22, 24);
}
</style>