<template>
  <div class="background_background1">
    <div class="bug bug1" @click="handleBugClick"></div>
    <div class="bug bug2" @click="handleBugClick"></div>
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
    this.moveBugs();
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

  methods: {
    initializeBugs() {
      const bugs = document.querySelectorAll('.bug');
      bugs.forEach((bug) => {
        this.placeBugRandomly(bug);
      });
    },
    moveBugs() {
      const bugs = document.querySelectorAll('.bug');
      setInterval(() => {
        bugs.forEach((bug) => {
          this.moveBug(bug);
        });
      }, 3000); // Move bugs every 3 seconds
    },
    placeBugRandomly(bug) {
      const maxX = window.innerWidth - bug.clientWidth;
      const maxY = window.innerHeight - bug.clientHeight;
      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;
      bug.style.left = `${newX}px`;
      bug.style.top = `${newY}px`;
    },
    moveBug(bug) {
      const maxX = window.innerWidth - bug.clientWidth;
      const maxY = window.innerHeight - bug.clientHeight;
      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;
      const rotation = Math.atan2(newY - parseFloat(bug.style.top), newX - parseFloat(bug.style.left)) * (180 / Math.PI);
      bug.style.transform = `translate(${newX}px, ${newY}px) rotate(${rotation}deg)`;
    },
    handleBugClick(event) {
      const bugElement = event.currentTarget;
      bugElement.classList.add('clicked');
    },
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
