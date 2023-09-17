<template>
  <div class="page">
    <div>
      <h1>Diplomingeniør i Softwareteknologi Studerende</h1>
      <h2>Christiaan Vink</h2>
    </div>
    <div>

    </div>

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
