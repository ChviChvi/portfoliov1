<template>
  <div>




    <header> n o o b</header>
    <navigation />
    <slot />

    <bottomfoot id="bottomfoot" />
  </div>
</template>

<script>



import '~/assets/css/template.css'
import Navigation from "../components/navigation";
import Bottomfoot from "../components/bottomfoot";
export default {
  components: {Bottomfoot, Navigation}
}
console.log("default")



</script>
