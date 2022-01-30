
<template>
  <div class="bg-zinc-700 text-zinc-100 h-screen">
    <main
      class="
        bg-gradient-to-tr
        from-emerald-500
        to-teal-600
        w-screen
        grid
        place-items-center
        py-24
      "
    >
      <div class="flex flex-col items-center">
        <!-- <img alt="Vue logo" class="" src="./assets/logo.png" /> -->
        <h1 class="text-4xl font-semibold text-center">
          <router-link to="/"> Covalent Quadratic Voting App </router-link>
        </h1>
        <h2 class="text-lg mt-6 border-b-2 border-sky-700">
          <a
            href="https://wtfisqf.com/
        "
            >Learn more about quadratic voting here.
          </a>
        </h2>
      </div>
    </main>

    <router-view></router-view>
  </div>

  <!-- OLD -->
  <!-- <div class="w-1/3 m-auto flex justify-between items-center mt-24">
    <EventCardVue
      title="Start an event"
      imageName="logo"
      buttonTitle="Create an event"
      type="submit"
    />
    <p class="font-semibold text-xl">or</p>
    <EventCardVue
      title="Join an event"
      imageName="logo"
      buttonTitle="join"
      type="number"
    />
  </div> -->
</template>

<script>
import EventCardVue from "./components/EventCard.vue";
import DaoCard from "./components/DaoCard.vue";

export default {
  name: "EventCard",
  components: {
    EventCardVue,
    DaoCard,
  },
};
</script>
