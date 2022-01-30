<template>
  <div class="rounded-2xl my-4 p-4 border-2 border-stone-200 w-3/12">
    <div class="flex justify-between">
      <p>Author</p>
      <p>0x ...</p>
    </div>
    <div class="flex justify-between">
      <p>Start</p>
      <p>01.01.1970</p>
    </div>
    <div class="flex justify-between">
      <p>End</p>
      <p>01.01.1971</p>
    </div>
    <div class="flex justify-between">
      <p>Time left</p>
      <p>32 hours</p>
    </div>
    <div class="flex justify-between">
      <p>Total votes</p>
      <p>624 GTC</p>
    </div>
    <div class="flex justify-between">
      <p>Voting %</p>
      <p>12 %</p>
    </div>
    <div class="flex justify-between">
      <p>Limited</p>
      <p>Yes</p>
    </div>
    <hr class="mt-4 mb-2" />
    <p class="mb-2">Allowed voters</p>
    <div class="flex mb-2">
      <svg
        class="w-6 h-6 mr-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <p>0x ...</p>
    </div>
    <div class="flex">
      <svg
        class="w-6 h-6 mr-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <p>0x ...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Voting Details",
};
</script>
