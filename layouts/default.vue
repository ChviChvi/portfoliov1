<template>
  <div class="background_background1" id="bugarea1">

    <!-- Bug 1 -->
    <div class="bug" id="bug1">
      <img src="../assets/bugs/bug-example1.png" alt="Bug 1" />
    </div>

    <!-- Bug 2 -->
    <div class="bug" id="bug2">
      <img src="../assets/bugs/bug-example2.png" alt="Bug 2" />
    </div>


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

    setInterval(() => {
      this.moveBug("bug1",50,50);
      this.moveBug("bug2",50,50);
    }, 1000);


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

    moveBug1(elementId, duration) {
      const element = document.getElementById(elementId);
      if (element) {
        // Add the "rotating" class to start the rotation animation
        element.style.animation = `rotate ${duration}s linear `;
       }
     },


    moveBug(bugId, bugWidth, bugHeight) {
      const element = document.getElementById(bugId);
      const maxDistance = 500;
      const randomX = (Math.random() * 2 - 1) * maxDistance;
      const randomY = (Math.random() * 2 - 1) * maxDistance;

      // Get the current position
      const currentTransform = getComputedStyle(element).transform;
      const currentX = parseFloat(currentTransform.split(",")[4]) || 0;
      const currentY = parseFloat(currentTransform.split(",")[5]) || 0;

      // Calculate the new position relative to the current position
      const newX = currentX + randomX;
      const newY = currentY + randomY;

      // Get the dimensions of the container
      const container = document.getElementById("bugarea1"); // Replace with your actual container ID
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      // Ensure the new position is within the container boundaries
      const padding = 200;

      const clampedX = Math.min(Math.max(newX, padding), containerWidth - element.offsetWidth - padding);
      const clampedY = Math.min(Math.max(newY, padding), containerHeight - element.offsetHeight - padding);

      // Calculate the angle between the current position and the destination point
      const angle = Math.atan2(clampedY - currentY, clampedX - currentX);
      const angleDegrees = (angle * 180) / Math.PI;

      // Apply the rotation and position
      element.style.transform = `translate(${clampedX}px, ${clampedY}px) rotate(${angleDegrees}deg)`;
      element.style.width = `${bugWidth}px`;
      element.style.height = `${bugHeight}px`;


      console.log(`Current position for bugId ${bugId}: X=${clampedX}, Y=${clampedY}`);
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
