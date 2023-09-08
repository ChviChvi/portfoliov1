<template>
  <div>
      <NuxtPage :key="$route.fullPath"/>
      <h1>Welcome to the homepage</h1>

  </div>
</template>

<script>

console.log("index")
import { blockNavigationWithDelay } from 'assets/js/navigation.js'; // Replace with the actual path

export default {
  beforeRouteLeave: blockNavigationWithDelay(), // Adjust the delay as needed
};
</script>
