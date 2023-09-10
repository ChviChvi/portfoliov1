<template>
  <div class="page">

    <div class="background-contact">
      hello
      <h1>Welcome to the contact</h1>

    </div>
  </div>
</template>

<script>

console.log("contact")
import '~/assets/css/template.css'


import { blockNavigationWithDelay } from 'assets/js/navigation.js'; // Replace with the actual path
export default {
  beforeRouteLeave: blockNavigationWithDelay(), // Adjust the delay as needed
};
</script>