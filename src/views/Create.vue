<template>
  <div class="w-2/3 m-auto mt-10" style="height: 60%">
    <h2 class="text-2xl">Create a new voting</h2>
    <div class="rounded-2xl my-4 p-4 border-2 border-stone-200">
      <div class="flex">
        <!-- Main -->
        <div class="pb-4 w-5/12">
          <h2 class="text-xl">DAO</h2>
          <input
            v-model="address"
            placeholder="DAO address"
            type="text"
            class="bg-transparent border-b w-11/12"
          />
          <div class="my-4 flex items-center">
            <img :src="newDaoData.logo" class="w-8" />
            <p class="ml-3">{{ newDaoData.symbol }}</p>
          </div>

          <h2 class="text-xl">Voting Title</h2>
          <input
            v-model="title"
            type="text"
            placeholder="Title"
            class="bg-transparent border-b mb-4 w-11/12"
          />
          <h2 class="text-xl">Voting Description</h2>
          <input
            v-model="description"
            type="text"
            placeholder="description"
            class="bg-transparent border-b mb-16 w-11/12"
          />

          <h2 class="text-xl">Voting Description</h2>
          <input
            v-model="description"
            type="text"
            placeholder="DAO address"
            class="bg-transparent border-b w-11/12"
          />
        </div>

        <!-- Date select -->
        <div class="">
          <h2 class="text-xl">Starting Date</h2>
          <input
            v-model="start"
            type="date"
            class="bg-transparent border-b mb-4 w-11/12"
          />
          <h2 class="text-xl">Ending Date</h2>
          <input
            v-model="end"
            type="date"
            class="bg-transparent border-b w-11/12"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Create voting",
  data() {
    return {
      address: "",
      title: "",
      description: "",
      start: "",
      end: "",
      prevRoute: null,
      newDaoData: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  mounted() {
    if (this.prevRoute != null) this.address = this.prevRoute.params.address;
    else this.address = "";
  },
  watch: {
    async address(newValue, oldValue) {
      if (newValue) {
        console.log(newValue);
        console.log(newValue.toLowerCase());
        const address = newValue.toLowerCase();
        await this.$store.dispatch("getBasicDAOData", newValue);
        for (const i in this.daoData) {
          if (this.daoData[i].address == address) {
            this.newDaoData = this.daoData[i];
          }
        }
      }
    },
  },
  computed: mapState(["daoData"]),
};
</script>
