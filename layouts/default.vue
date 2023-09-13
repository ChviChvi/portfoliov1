<template>
  <div class="background_background1">

    <header> n o o b</header>
    <div className="nav-background" />
    <navigation > </navigation>

    <slot class="column_body"> </slot>
    <bottomfoot id="bottomfoot" />
  </div>
</template>

<script>



import '~/assets/css/template.css'
import Navigation from "../components/navigation";
import Bottomfoot from "../components/bottomfoot";
import { blockNavigationWithDelay } from 'assets/js/navigation.js'; // Replace with the actual path

/*<img src="~/assets/1clownfish.jpg" alt="upper-background" class="upper-background" />*/

export default {
  components: {Bottomfoot, Navigation},
  beforeRouteLeave: blockNavigationWithDelay(), // Adjust the delay as needed

  mounted() {
    // Add an event listener for the wheel event
    window.addEventListener('wheel', this.handleWheel);
  },
  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    window.removeEventListener('wheel', this.handleWheel);
  },
  data() {
    return {
      routes: [
        "/",
        "/about",
        "/experiences",
        "/projects",
        "/courses",
        "/contact",
      ],
      currentRouteIndex: 0, // Index of the current route in the routes array
    };
  },
  // beforeDestroy() {
  //   window.removeEventListener("scroll", this.handleScroll);
  // },
  // data() {
  //   return {
  //     scrollPosition: 0,
  //     routes: [
  //       "/",
  //       "/about",
  //       "/experiences",
  //       "/projects",
  //       "/courses",
  //       "/contact",
  //     ],
  //   };
  // },
  methods: {
    // handleScroll() {
    //   const scrollY = window.scrollY;
    //   const scrollDirection = scrollY > this.scrollPosition ? "down" : "up";
    //
    //   console.log(scrollDirection)
    //   // Update the scroll position
    //   this.scrollPosition = scrollY;
    //
    //   // Define a threshold for when to trigger navigation
    //   const threshold = 100; // Adjust this value as needed
    //
    //   // Get the current route index
    //   const currentRouteIndex = this.routes.indexOf(this.$route.path);
    //
    //   if (scrollDirection === "down" && scrollY > threshold) {
    //     // Scroll down, navigate to the next page if not on the last page
    //     if (currentRouteIndex < this.routes.length - 1) {
    //       this.$router.push(this.routes[currentRouteIndex + 1]);
    //     }
    //   } else if (scrollDirection === "up" && scrollY < threshold) {
    //     // Scroll up, navigate to the previous page if not on the homepage
    //     if (currentRouteIndex > 0) {
    //       this.$router.push(this.routes[currentRouteIndex - 1]);
    //     }
    //   }
    // },
    handleWheel(event) {
      if (this.isScrolling) {
        // If scrolling action is already in progress, do nothing
        return;
      }

      const deltaY = event.deltaY;

      if (deltaY > 0 && this.currentRouteIndex < this.routes.length - 1) {
        // User is scrolling down, and there's a next route available
        this.isScrolling = true;
        this.currentRouteIndex++;
        this.$router.push(this.routes[this.currentRouteIndex]);
        console.log('Scrolling down');

        // Add a timeout to reset isScrolling after a delay (e.g., 1000ms)
        setTimeout(() => {
          this.isScrolling = false;
        }, 550);
      } else if (deltaY < 0 && this.currentRouteIndex > 0) {
        // User is scrolling up, and there's a previous route available
        this.isScrolling = true;
        this.currentRouteIndex--;
        this.$router.push(this.routes[this.currentRouteIndex]);
        console.log('Scrolling up');

        // Add a timeout to reset isScrolling after a delay (e.g., 1000ms)
        setTimeout(() => {
          this.isScrolling = false;
        }, 550);
      }
    },
  },
}
console.log("default")




</script>
