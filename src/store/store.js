import { createStore } from "vuex";
import axios from "axios";
import registeredDAOs from "../utils/dbConnect";

export const store = createStore({
  state: {
    blockHeight: 11565118,
    totalVotings: 0,
    daoData: [],
  },
  actions: {
    async getCurrentBlockHeight({ commit }) {
      axios
        .get(
          `https://api.covalenthq.com/v1/1/block_v2/2021-01-01/2021-01-03/?key=${
            import.meta.env.VITE_COVALENT_KEY
          }`
        )
        .then((response) => {
          commit(
            "GET_BLOCK_HEIGHT",
            response.data.data.items[response.data.data.items.length - 1].height
          );
        });
    },
    async getBasicDAOData({ commit }, daoAddress) {
      await axios
        .get(
          `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/1/USD/${daoAddress}/?key=${
            import.meta.env.VITE_COVALENT_KEY
          }`
        )
        .then((response) => {
          commit("GET_BASIC_DAO_DATA", response.data.data[0]);
        });
    },
    async getAllDAOVotings(context, daoAddress) {
      const dao = await (
        await registeredDAOs()
      ).findOne({ daoAddress: daoAddress });

      // const testVoting = {
      //   name: "NEW",
      //   description: "TEST",
      //   author: "0x420",
      //   start: "2009-12-12T23:00:00.000Z",
      //   end: "2020-12-31T23:00:00.000Z",
      //   options: [
      //     {
      //       optionName: "first",
      //       optionTotalVotes: 42,
      //     },
      //     {
      //       optionName: "second",
      //       optionTotalVotes: 62,
      //     },
      //     {
      //       optionName: "second",
      //       optionTotalVotes: 62,
      //     },
      //   ],
      //   limited: false,
      // };

      // await (
      //   await registeredDAOs()
      // ).updateOne(
      //   { daoAddress: daoAddress },
      //   { $push: { votings: testVoting } }
      // );

      return dao;
    },
  },
  mutations: {
    GET_BLOCK_HEIGHT(state, block_height) {
      state.blockHeight = block_height;
    },
    GET_BASIC_DAO_DATA(state, response) {
      state.daoData.push({
        name: response.contract_name,
        symbol: response.contract_ticker_symbol,
        logo: response.logo_url,
        address: response.contract_address,
      });
    },
  },
});
