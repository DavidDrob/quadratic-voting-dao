<template>
  <div class="w-2/3 m-auto flex justify-between items-center mt-24 flex-wrap">
    <DaoCard
      title="0x32934dA17622faEb1F8c9fAb354fc194cF8e4378"
      logoUrl="logo"
      buttonTitle="View"
      link="0xde30da39c46104798bb5aa3fe8b9e0e1f348163f"
    />
    <DaoCard
      title="Vue DAO"
      logoUrl="logo"
      buttonTitle="View"
      link="0xde30da39c46104798bb5aa3fe8b9e0e1f348163f"
    />
    <DaoCard
      title="Vue DAO"
      logoUrl="logo"
      buttonTitle="View"
      link="0xde30da39c46104798bb5aa3fe8b9e0e1f348163f"
    />
  </div>
</template>

<script>
import DaoCard from "../components/DaoCard.vue";

export default {
  name: "EventCard",
  components: {
    DaoCard,
  },
};
</script>