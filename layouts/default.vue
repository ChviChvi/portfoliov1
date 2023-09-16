<template>
  <div class="background_background1" id="bugarea1">
<!--    <div class="line" id="line"></div>-->
    <!-- Bug 1 -->
    <div class="bug" id="bug1" @click="handleBugClick('bug1')">
      <img src="../assets/bugs/bug-example1.png" alt="Bug 1" />
    </div>

    <!-- Bug 2 -->
    <div class="bug" id="bug2" @click="handleBugClick('bug2')">
      <img src="../assets/bugs/bug-example2.png" alt="Bug 2" />
    </div>

    <div class="bug" id="bug3" @click="handleBugClick('bug3')">
      <img src="../assets/bugs/bug-example1.png" alt="Bug 1" />
    </div>

    <div class="bug" id="bug4" @click="handleBugClick('bug4')">
      <img src="../assets/bugs/bug-example1.png" alt="Bug 1" />
    </div>

    <div class="bug" id="bug5" @click="handleBugClick('bug5')">
      <img src="../assets/bugs/bug-example1.png" alt="Bug 1" />
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
import {blockNavigationWithDelay, calculateRotationAngle} from 'assets/js/navigation.js'; // Replace with the actual path

/*<img src="~/assets/1clownfish.jpg" alt="upper-background" class="upper-background" />*/

export default {
  components: {Bottomfoot, Navigation},
  beforeRouteLeave: blockNavigationWithDelay(), // Adjust the delay as needed
  calculateRotationAngle: calculateRotationAngle(),

  mounted() {
    // Add an event listener for the wheel event
    window.addEventListener('wheel', this.handleWheel);


    this.moveBug('bug1', this.bugs.bug1.x, this.bugs.bug1.y,this.bugs.bug1.angle);
    this.moveBug('bug2', this.bugs.bug2.x, this.bugs.bug2.y,this.bugs.bug2.angle);
    this.moveBug('bug3', this.bugs.bug3.x, this.bugs.bug3.y,this.bugs.bug3.angle);
    this.moveBug('bug4', this.bugs.bug4.x, this.bugs.bug4.y,this.bugs.bug4.angle);
    this.moveBug('bug5', this.bugs.bug5.x, this.bugs.bug5.y,this.bugs.bug5.angle);





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
      rotation_done: false,
      rotated: 0,
      bugs: { bug1: {x:0,y:0, angle:0, rotation_done:false, dead:false},
              bug2: {x:0,y:0, angle:0, rotation_done:false, dead:false},
              bug3: {x:0,y:0, angle:0, rotation_done:false, dead:false},
              bug4: {x:0,y:0, angle:0, rotation_done:false, dead:false},
              bug5: {x:0,y:0, angle:0, rotation_done:false, dead:false},
              bug6: {x:0,y:0, angle:0, rotation_done:false, dead:false},
              bug7: {x:0,y:0, angle:0, rotation_done:false, dead:false},
      }

    };
  },




  methods: {
    handleBugClick(bugId) {
      // Set the 'dead' property of the clicked bug to true
      console.log("you killed " + this.bugs[bugId] )
      this.bugs[bugId].dead = true;
    },

    async moveBug(bugId, bugx, bugy, bugangle) {

      const element = document.getElementById(bugId);
      const line = document.getElementById('line');


      const starting_position_bug = {
        x: bugx,
        y: bugy
      };

      // setTimeout(() => {
      //   element.style.transform = `translate(${bugx}px, ${bugy}px) rotate(${bugangle}deg) scale(0.2)`;
      // }, 1);


      const container = document.getElementById("bugarea1"); // Replace with your actual container ID
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const minDistanceFromEdge = 100;


      const maxX = containerWidth - minDistanceFromEdge;
      const maxY = containerHeight - minDistanceFromEdge;


      const randomX = minDistanceFromEdge + Math.random() * (maxX - minDistanceFromEdge);
      const randomY = minDistanceFromEdge + Math.random() * (maxY - minDistanceFromEdge);

      const ending_position_bug = {x: randomX, y: randomY};

      const a = starting_position_bug.x - ending_position_bug.x;
      const b = starting_position_bug.y - ending_position_bug.y;
      const length = Math.sqrt(a * a + b * b);

      const desiredSpeed = 50; // Adjust this value as needed, higher values will make the animation faster
      const duration = length / desiredSpeed; // Duration in seconds
      const total_duration = (duration * 1000)

      // Get angle between points
      const angleDeg = (Math.atan2(ending_position_bug.y - starting_position_bug.y, ending_position_bug.x - starting_position_bug.x) * 180 / Math.PI);


      // line.style.width = length + 'px';
      // line.style.left = (starting_position_bug.x) + 'px';
      // line.style.top = (starting_position_bug.y) + 'px';
      // line.style.transform = 'rotate(' + angleDeg + 'deg)';



      //setTimeout(() => {
      element.style.transition = `transform ${2000}ms ease-in-out`;
      element.style.transform = `translate(${starting_position_bug.x}px, ${starting_position_bug.y}px) rotate(${angleDeg + 90}deg) scale(0.2)`;
      element.style.transformOrigin = 'center center';

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // setTimeout(() => {
      this.bugs[bugId].rotation_done = true;
      console.log("3")
      //},100);
      // },100);


      //setTimeout(() => {
      if (this.bugs[bugId].rotation_done) {
        console.log("4");

        console.log(starting_position_bug)
        console.log(ending_position_bug)

        element.style.transition = `transform ${duration}s ease-in-out`;
        element.style.transform = `translate(${ending_position_bug.x}px, ${ending_position_bug.y}px) rotate(${angleDeg + 90}deg) scale(0.2)`;
        element.style.transformOrigin = 'center center';
        console.log("we got to the moving part!")

        this.bugs[bugId].x = ending_position_bug.x;
        this.bugs[bugId].y = ending_position_bug.y;
        this.bugs[bugId].angle = angleDeg + 90;
      }
      //},2500);

      if(this.bugs[bugId].dead){
       //initialize a splat animaiton here
        // find a way for it to be instant
        //maybe call it everywhere in the function :)
      } else {

      // here we safe the new data in the old data
      await new Promise((resolve) => setTimeout(resolve, total_duration));
      console.log("this is the current data of the bug: x" + this.bugs[bugId].x + " y:" + this.bugs[bugId].y + " angle: " + this.bugs[bugId].angle);
      this.bugs[bugId].rotation_done = false;
      await this.moveBug(bugId, this.bugs[bugId].x, this.bugs[bugId].y, this.bugs[bugId].angle);
      }


    },


    // const starting_position_bug = {
    //   x: element.offsetLeft + element.offsetWidth / 2,
    //   y: element.offsetTop + element.offsetHeight / 2
    // };
    //const rect = element.getBoundingClientRect();
    //const currentX = rect.left + rect.width / 2;
    //const currentY = rect.top + rect.height / 2;
    //const newX = currentX + randomX;
    //const newY = currentY + randomY;
    // getCurrentRotation(el) {
    //   const st = window.getComputedStyle(el, null);
    //   const tm = st.getPropertyValue("-webkit-transform") ||
    //       st.getPropertyValue("-moz-transform") ||
    //       st.getPropertyValue("-ms-transform") ||
    //       st.getPropertyValue("-o-transform") ||
    //       st.getPropertyValue("transform") ||
    //       "none";
    //   if (tm !== "none") {
    //     const values = tm.split('(')[1].split(')')[0].split(',');
    //     /*
    //     a = values[0];
    //     b = values[1];
    //     angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
    //     */
    //     //return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI)); //this would return negative values the OP doesn't wants so it got commented and the next lines of code added
    //     const angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
    //     return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
    //   }
    //   return 0;
    // },



    // drawLine(startX, startY, endX, endY) {
    //   const line = document.getElementById('line');
    //   const length = Math.sqrt((startX- endX  ) ** 2 + (  startY - endY) ** 2);
    //   const angle = Math.atan2(endY - startY, endX - startX);
    //
    //   // Set the position and rotation of the line
    //   line.style.left = `${startX}px`;
    //   line.style.top = `${startY}px`;
    //   line.style.transform = `rotate(${angle}rad)`;
    //
    //   // Set the width of the line to match the distance between points
    //   line.style.width = `${length}px`;
    // },
    // drawLineFromTopOfBug(bugId, startX, startY, endX, endY) {
    //   const bug = document.getElementById(bugId);
    //   const line = document.getElementById('line');
    //
    //   // Calculate the position of the top center of the bug
    //   const bugRect = bug.getBoundingClientRect();
    //   const bugTopCenterX = bugRect.left + bugRect.width / 2;
    //   const bugTopCenterY = bugRect.top;
    //
    //   // Calculate the length and angle of the line
    //   const length = Math.sqrt((endX - bugTopCenterX) ** 10 + (endY - bugTopCenterY) ** 10);
    //   const angle = Math.atan2(endY - bugTopCenterY, endX - bugTopCenterX);
    //
    //   // Set the position of the line to start from the top center of the bug
    //   line.style.left = `${bugTopCenterX}px`;
    //   line.style.top = `${bugTopCenterY}px`;
    //
    //   // Set the rotation of the line
    //   line.style.transform = `rotate(${angle}rad)`;
    //
    //   // Set the width of the line to match the distance between the bug and the ending point
    //   line.style.width = `${length}px`;
    // },


    // moveBug(bugId, bugWidth, bugHeight) {
    //   const element = document.getElementById(bugId);
    //   const maxDistance = 500;
    //   const randomX = (Math.random() * 2 - 1) * maxDistance;
    //   const randomY = (Math.random() * 2 - 1) * maxDistance;
    //
    //   // Get the current position
    //   const currentTransform = getComputedStyle(element).transform;
    //   const currentX = parseFloat(currentTransform.split(",")[4]) || 0;
    //   const currentY = parseFloat(currentTransform.split(",")[5]) || 0;
    //
    //   // Calculate the new position relative to the current position
    //   const newX = currentX + randomX;
    //   const newY = currentY + randomY;
    //
    //   // Get the dimensions of the container
    //   const container = document.getElementById("bugarea1"); // Replace with your actual container ID
    //   const containerWidth = container.offsetWidth;
    //   const containerHeight = container.offsetHeight;
    //
    //   // Ensure the new position is within the container boundaries
    //   const padding = 200;
    //
    //   const clampedX = Math.min(Math.max(newX, padding), containerWidth - element.offsetWidth - padding);
    //   const clampedY = Math.min(Math.max(newY, padding), containerHeight - element.offsetHeight - padding);
    //
    //   // Calculate the angle between the current position and the destination point
    //   const angle = Math.atan2(clampedY - currentY, clampedX - currentX);
    //   const angleDegrees = (angle * 180) / Math.PI;
    //
    //   // Rotate the bug
    //   element.style.transform = `rotate(${angleDegrees}deg)`;
    //
    //   // Pause for a specified time (e.g., 500 milliseconds) before moving
    //   setTimeout(() => {
    //     element.style.transition = "transform 3s ease";
    //     // Move the bug to the new position
    //     element.style.transform = `translate(${clampedX}px, ${clampedY}px) rotate(${angleDegrees}deg)`;
    //     element.style.width = `${bugWidth}px`;
    //     element.style.height = `${bugHeight}px`;
    //
    //     console.log(`Current position for bugId ${bugId}: X=${clampedX}, Y=${clampedY}`);
    //
    //     // Pause for a specified time (e.g., 500 milliseconds) before scheduling the next rotation and movement
    //     setTimeout(() => {
    //       this.moveBug(bugId, bugWidth, bugHeight);
    //     }, 2000); // Adjust the pause duration as needed
    //   }, 2000); // Adjust the pause duration as needed
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
