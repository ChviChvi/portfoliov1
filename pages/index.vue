<template>
  <div className="page">


        <h1>Welcome to the homepage</h1>


  </div>
</template>

<script>
import '~/assets/css/template.css'
console.log("homepage")
import { blockNavigationWithDelay } from 'assets/js/navigation.js'; // Replace with the actual path

export default {
  beforeRouteLeave: blockNavigationWithDelay(), // Adjust the delay as needed
};
</script>
