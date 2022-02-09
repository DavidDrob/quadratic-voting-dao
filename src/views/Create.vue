<template>
  <div class="w-2/3 m-auto mt-10" style="height: 60%">
    <h2 class="text-2xl">Create a new voting</h2>
    <div class="rounded-2xl my-4 p-4 border-2 border-stone-200">
      <div class="flex justify-between">
        <!-- Main -->
        <div class="pb-4 w-7/12">
          <h2 class="text-xl">DAO</h2>
          <input
            v-model="address"
            placeholder="DAO address"
            type="text"
            class="bg-transparent border-b w-full"
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
            class="bg-transparent border-b mb-4 w-full"
          />
          <h2 class="text-xl">Voting Description</h2>
          <textarea
            v-model="description"
            placeholder="description"
            class="bg-transparent border-b mb-16 w-full h-24 mt-2"
          ></textarea>

          <OptionInput @addOption="addToOptionArray" class="mb-6" />
          <Options
            v-for="(option, index) in options"
            :key="index"
            :title="option"
            @removeOption="removeFromOptionArray"
          />
          <SubmitButton title="Create voting" @click="submit" />
        </div>

        <!-- Date select -->
        <div class="">
          <h2 class="text-xl">Starting Date</h2>
          <input
            type="datetime-local"
            v-model="start"
            class="bg-transparent border-b mb-4 w-full"
          />
          <h2 class="text-xl">Ending Date</h2>
          <input
            type="datetime-local"
            v-model="end"
            class="bg-transparent border-b w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Options from "../components/create/Options.vue";
import OptionInput from "../components/create/OptionInput.vue";
import SubmitButton from "../components/SubmitButton.vue";

export default {
  name: "Create voting",
  components: {
    Options,
    OptionInput,
    SubmitButton,
  },
  data() {
    return {
      address: "",
      title: "",
      description: "",
      start: "",
      end: "",
      prevRoute: null,
      newDaoData: [],
      options: [],
    };
  },
  methods: {
    addToOptionArray(value) {
      this.options.push(value);
    },
    removeFromOptionArray(value) {
      const index = this.options.indexOf(value);
      if (index > -1) {
        this.options.splice(index, 1);
      }
    },
    async submit() {
      // error checking
      function nameIsNotDuplicate(dao, title) {
        if (dao.votings.length == 0) return true;
        for (let i = 0; i < dao.votings.length; i++) {
          const element = dao.votings[i];
          if (element.name != title) return true;
          else return false;
        }
      }

      let dao = await this.$store.dispatch("getAllDAOVotings", this.address);
      if (dao == null) {
        //create a new document
        const daoCreated = await this.$store.dispatch(
          "postNewDao",
          this.address.toLowerCase()
        );
        // make new request
        if (daoCreated)
          dao = await this.$store.dispatch(
            "getAllDAOVotings",
            this.address.toLowerCase()
          );
      }

      let newOptions = [];
      this.options.forEach((element) => {
        const option = {
          optionName: element,
          optionTotalVotes: 0,
        };
        newOptions.push(option);
      });

      if (
        this.title &&
        this.options.length >= 2 &&
        this.start &&
        this.end &&
        nameIsNotDuplicate(dao, this.title)
      ) {
        const voting = {
          name: this.title,
          description: this.description,
          author: this.userAddress,
          start: this.start,
          end: this.end,
          options: newOptions,
        };
        const daoAddress = this.address.toLowerCase();
        const response = await this.$store.dispatch("postNewVoting", {
          daoAddress,
          voting,
        });

        const path = "/" + daoAddress + "/" + this.title;
        console.log(path);
        if (response) {
          this.$router.push({
            path,
          });
        }
      }
    },
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
        const address = newValue.toLowerCase();
        await this.$store.dispatch("getBasicDAOData", newValue);
        for (const i in this.daoData) {
          if (this.daoData[i].address == address) {
            this.newDaoData = this.daoData[i];
          }
        }
      }
      // on submit
      // if (this.newDaoData.address != newValue.toLowerCase()) {
      //   alert("sorry");
      // }
    },
  },
  computed: mapState(["daoData", "userAddress"]),
};
</script>
