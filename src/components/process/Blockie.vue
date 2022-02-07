<template>
  <div class="flex items-center mb-2">
    <!-- <div class="icon-div bg-gray-800">{{ address }}</div> -->
    <div v-html="createBlockie()" />
  </div>
</template>

<script>
import blockies from "ethereum-blockies";

export default {
  name: "Blockies",
  props: ["address"],
  data() {
    return {
      icon: null,
    };
  },

  methods: {
    createBlockie() {
      if (this.address) {
        var icon = blockies.create({
          seed: `#${this.address.substr(28, 8)}`,
          color: `#${this.address.substr(2, 2)}`,
          bgcolor: `#${this.address.substr(9, 6)}`,
          size: 10,
          scale: 3,
          spotcolor: `#${this.address.substr(22, 6)}`,
        });
        // const children = document.querySelector(".icon-div").children.length;

        const test = document.createElement("div").appendChild(icon);
        console.log(test);
        //   .appendChild(`<p>${this.address}</p>`);
        // document
        //   .querySelector(".icon-div")
        //   .appendChild(icon)
        //   .classList.add("rounded-xl", "blockie");

        return `<div>${test}</div> ${this.address}`;
      }
    },
  },
  watch: {
    address(newValue, oldValue) {
      if (newValue != oldValue) this.createBlockie(this.address);
    },
  },
  mounted() {
    this.createBlockie(this.address);
  },
};
</script>