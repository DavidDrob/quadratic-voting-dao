import { createStore } from "vuex";
import axios from "axios";
import registeredDAOs from "../utils/dbConnect";

export const store = createStore({
  state: {
    blockHeight: 11565118,
    totalVotings: 0,
    daoData: [],
    userAddress: "0x32934dA17622faEb1F8c9fAb354fc194cF8e4378",
    userTokens: 0,
    tokenSupply: 0,
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
    async getTokenSupply({ commit }, daoAddress) {
      await axios
        .get(
          `https://api.covalenthq.com/v1/1/tokens/${daoAddress}/token_holders/?key=${
            import.meta.env.VITE_COVALENT_KEY
          }`
        )
        .then((response) => {
          commit(
            "GET_TOKEN_SUPPLY",
            response.data.data.items[0].total_supply /
              10 ** response.data.data.items[0].contract_decimals
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
          commit("GET_BASIC_DAO_DATA", response.data.data.items[0]);
        });
    },
    async getAllDAOVotings({ commit }, daoAddress) {
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
      commit("GET_ALL_DAO_VOTINGS", dao);
      return dao;
    },
    async getUsersGOVTokens({ commit, state }, daoAddress) {
      axios
        .get(
          `https://api.covalenthq.com/v1/1/address/${
            state.userAddress
          }/balances_v2/?key=${import.meta.env.VITE_COVALENT_KEY}`
        )
        .then((res) => {
          res.data.data.items.forEach((element) => {
            if (element.contract_address === daoAddress) {
              commit(
                "GET_USERS_TOKENS",
                Math.floor(element.balance / 10 ** element.contract_decimals)
              );
            }
          });
        });
    },
    async postUsersVoting(context, { daoAddress, votingObject, votingName }) {
      for (const i in votingObject) {
        // Get the voting and the option
        const optionName = votingObject[i].optionName;
        const optionVotes = votingObject[i].optionTotalVotes;
        const dao = await (
          await registeredDAOs()
        ).findOne({
          daoAddress: daoAddress,
        });
        const votingIndex = dao.votings.findIndex((i) => i.name == votingName);
        const votingOptionIndex = dao.votings[votingIndex].options.findIndex(
          (i) => i.optionName == optionName
        );

        // increment votes
        const field = `votings.${votingIndex}.options.${votingOptionIndex}.optionTotalVotes`;
        const update = await (
          await registeredDAOs()
        ).updateOne(
          {
            daoAddress: daoAddress,
          },
          {
            $inc: {
              [field]: optionVotes,
            },
          }
        );

        // add user address to voted array
        const votedField = `votings.${votingIndex}.voted`;
        const address = context.state.userAddress;
        await (
          await registeredDAOs()
        ).updateOne(
          {
            daoAddress: daoAddress,
          },
          {
            $addToSet: {
              [votedField]: address,
            },
          }
        );
      }
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
    GET_USERS_TOKENS(state, userTokens) {
      state.userTokens = userTokens;
      // state.userTokens = 100;
    },
    GET_TOKEN_SUPPLY(state, response) {
      state.tokenSupply = response;
    },
    GET_ALL_DAO_VOTINGS(state, dao) {
      // console.log(dao);
    },
  },
});
