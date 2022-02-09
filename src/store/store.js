import { createStore } from "vuex";
import axios from "axios";
import registeredDAOs from "../utils/dbConnect";

export const store = createStore({
  state: {
    blockHeight: 11565118,
    totalVotings: 0,
    daoData: [],
    userAddress: "",
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
          const responseItems = res.data.data.items;
          commit("GET_USERS_TOKENS", { responseItems, daoAddress });
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
        const done = await (
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
      window.location.reload();
    },
    async postNewVoting(context, { daoAddress, voting }) {
      const updateResponse = await (
        await registeredDAOs()
      ).updateOne({ daoAddress: daoAddress }, { $push: { votings: voting } });

      return updateResponse;
    },
    async postNewDao(context, daoAddress) {
      const newDao = await (
        await registeredDAOs()
      ).insertOne({
        daoAddress: daoAddress,
        votings: [],
      });
      return newDao;
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
    GET_USERS_TOKENS(state, payload) {
      for (let i = 0; i < payload.responseItems.length; i++) {
        const element = payload.responseItems[i];
        if (element.contract_address === payload.daoAddress) {
          state.userTokens = Math.floor(
            element.balance / 10 ** element.contract_decimals
          );
          break;
        } else {
          state.userTokens = 0;
        }
      }
    },
    GET_TOKEN_SUPPLY(state, response) {
      state.tokenSupply = response;
    },
    GET_ALL_DAO_VOTINGS(state, dao) {
      // console.log(dao);
    },
  },
});
