<template>
  <div class="w-2/3 m-auto mt-10">
    <a @click="$router.go(-1)" class="cursor-pointer">
      <DaoHead />
    </a>

    <div class="m-4 mt-8 flex flex-col justify-center">
      <h2 class="text-2xl">Current Processes</h2>
      <div class="flex justify-between">
        <Description />
        <Details />
      </div>
    </div>
  </div>
</template>

<script>
import DaoHead from "../components/DaoHead.vue";
import Description from "../components/process/Description.vue";
import Details from "../components/process/Details.vue";

export default {
  name: "DAO Page",
  components: {
    DaoHead,
    Description,
    Details,
  },
};
</script>
