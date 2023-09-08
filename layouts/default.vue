<template>
  <div>

    <header> n o o b</header>
    <navigation class="column_nav"> </navigation>
    <slot class="column_body"> </slot>

    <bottomfoot id="bottomfoot" />
  </div>
</template>

<script>



import '~/assets/css/template.css'
import Navigation from "../components/navigation";
import Bottomfoot from "../components/bottomfoot";
import { checkScroll } from 'assets/js/navigation.js';


export default {
  components: {Bottomfoot, Navigation},

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      scrollPosition: 0,
      routes: [
        "/",
        "/about",
        "/experiences",
        "/projects",
        "/courses",
        "/contact",
      ],
    };
  },
  methods: {
    handleScroll() {
      const scrollY = window.scrollY;
      const scrollDirection = scrollY > this.scrollPosition ? "down" : "up";

      // Update the scroll position
      this.scrollPosition = scrollY;

      // Define a threshold for when to trigger navigation
      const threshold = 100; // Adjust this value as needed

      // Get the current route index
      const currentRouteIndex = this.routes.indexOf(this.$route.path);

      if (scrollDirection === "down" && scrollY > threshold) {
        // Scroll down, navigate to the next page if not on the last page
        if (currentRouteIndex < this.routes.length - 1) {
          this.$router.push(this.routes[currentRouteIndex + 1]);
        }
      } else if (scrollDirection === "up" && scrollY < threshold) {
        // Scroll up, navigate to the previous page if not on the homepage
        if (currentRouteIndex > 0) {
          this.$router.push(this.routes[currentRouteIndex - 1]);
        }
      }
    },
  },
}
console.log("default")




</script>
