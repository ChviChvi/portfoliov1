


<template>
  <div class="page">

   <h1>Welcome to the about lorem ipsum</h1>

  </div>
</template>

<script>

console.log("about")
import '~/assets/css/template.css'


import { blockNavigationWithDelay } from 'assets/js/navigation.js'; // Replace with the actual path

export default {
  beforeRouteLeave: blockNavigationWithDelay(), // Adjust the delay as needed


};



</script>