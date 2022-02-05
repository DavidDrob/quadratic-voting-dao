<template>
  <div class="rounded-2xl my-4 py-4 pl-4 border-2 border-stone-200">
    <div class="flex">
      <div class="pb-4">
        <h2 class="text-xl">Title</h2>
        <p class="w-11/12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem aut nemo
          accusantium minima deleniti beatae, esse veritatis fuga optio debitis
          perspiciatis excepturi qui harum autem similique labore temporibus
          eius voluptatibus!
        </p>
      </div>
      <div class="w-2/4 h-min">
        <h2 class="text-xl">Time left</h2>
        <p>32 hours</p>
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/3">
        <h2 class="text-xl">Current Results</h2>
        <progress class="w-full"></progress>
      </div>
      <router-link class="ml-auto mr-6" :to="this.$route.path + '/' + this._id">
        <SubmitButton title="Vote" />
      </router-link>
    </div>
  </div>
</template>

<script>
import SubmitButton from "../components/SubmitButton.vue";

export default {
  name: "DAO Page",
  data() {
    return {
      _id: "0",
    };
  },
  components: {
    SubmitButton,
  },
};
</script>