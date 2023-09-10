<template>
  <div className="page">

    <h1>Welcome to the experiences</h1>


  </div>
</template>

<script>

console.log("experiences")
import '../assets/UFFEVESRION2.gif'
import { blockNavigationWithDelay } from 'assets/js/navigation.js'; // Replace with the actual path

export default {
  beforeRouteLeave: blockNavigationWithDelay(), // Adjust the delay as needed
};
</script>