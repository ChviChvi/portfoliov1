<template>

  <header class="bugcounter"> {{ deadBugsCount }}/6 bugs fixed
    <meta name="viewport" content="width=device-width, initial scale= 1.0">
  </header>


  <div class="background_background1" id="bugarea1">
<!--    <div class="line" id="line"></div>-->
    <!-- Bug 1 -->
    <div class="bug-group">
      <div class="bug top-left" id="bug1" @click="handleBugClick('bug1')">
        <img src="../assets/bugs/green_bug.gif" alt="Bug 1" />
      </div>

      <!-- Bug 2 -->
      <div class="bug top-right" id="bug2" @click="handleBugClick('bug2')">
        <img src="../assets/bugs/purple_bug.gif" alt="Bug 1" />
      </div>

      <div class="bug bottom-left" id="bug3" @click="handleBugClick('bug3')">
        <img src="../assets/bugs/red_bug.gif" alt="Bug 1" />
      </div>

      <div class="bug bottom-right" id="bug4" @click="handleBugClick('bug4')">
        <img src="../assets/bugs/green_bug.gif" alt="Bug 1" />
      </div>

      <div class="bug bottom-right" id="bug5" @click="handleBugClick('bug5')">
        <img src="../assets/bugs/purple_bug.gif" alt="Bug 1" />
      </div>

      <div class="bug bottom-right" id="bug6" @click="handleBugClick('bug6')">
        <img src="../assets/bugs/red_bug.gif" alt="Bug 1" />
      </div>
    </div>


    <div className="nav-background" />
    <navigation > </navigation>

    <slot class="column_body">



    </slot>
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

  computed: {
    deadBugsCount() {
      let count = 0;
      for (const bugKey in this.bugs) {
        if (this.bugs[bugKey].dead) {
          count++;
        }
      }
      return count;
    }
  },

  mounted() {
    // Add an event listener for the wheel event
    window.addEventListener('wheel', this.handleWheel);




    this.moveBug('bug1', this.bugs.bug1.x, this.bugs.bug1.y,this.bugs.bug1.angle);
    this.moveBug('bug2', this.bugs.bug2.x, this.bugs.bug2.y,this.bugs.bug2.angle);
    this.moveBug('bug3', this.bugs.bug3.x, this.bugs.bug3.y,this.bugs.bug3.angle);
    this.moveBug('bug4', this.bugs.bug4.x, this.bugs.bug4.y,this.bugs.bug4.angle);
    this.moveBug('bug5', this.bugs.bug5.x, this.bugs.bug5.y,this.bugs.bug5.angle);
    this.moveBug('bug6', this.bugs.bug6.x, this.bugs.bug6.y,this.bugs.bug6.angle);





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
      bugs: { bug1: {x:0,y:0, angle:0, rotation_done:false, dead:false,hidden:true},
              bug2: {x:0,y:0, angle:0, rotation_done:false, dead:false,hidden:true},
              bug3: {x:0,y:0, angle:0, rotation_done:false, dead:false,hidden:true},
              bug4: {x:0,y:0, angle:0, rotation_done:false, dead:false,hidden:true},
              bug5: {x:0,y:0, angle:0, rotation_done:false, dead:false,hidden:true},
              bug6: {x:0,y:0, angle:0, rotation_done:false, dead:false,hidden:true},

      }

    };
  },




  methods: {
    handleBugClick(bugId) {
      // Set the 'dead' property of the clicked bug to true
      console.log("you killed " + this.bugs[bugId] )
      this.bugs[bugId].dead = true;

      const element = document.getElementById(bugId)

      if(this.bugs[bugId].dead){

        //element.classList.add('splat-animation');
        //initialize a splat animaiton here
        // find a way for it to be instant
        //maybe call it everywhere in the function :)
        console.log("doesnt want to die. " + this.bugs[bugId] )

        element.style.transition = `transform ${2000}ms ease-in-out`;

        //maybe change the animation here..
        element.style.transform = `translate(${-6}vh, ${0}vh) rotate(${-720}deg) scale(0.2)`;
      }

    },
    async showBug(bugId) {

      this.bugs[bugId].x = window.innerWidth + Math.random() * 50 + 50;
      this.bugs[bugId].y = Math.random() * (window.innerHeight - 100) + 50;

      const starting_position_bug = {
        x: this.bugs[bugId].x,
        y: this.bugs[bugId].y,
      };

      const element = document.getElementById(bugId)

      element.style.transition = `transform ${200}ms ease-in-out`;
      element.style.transform = `translate(${starting_position_bug.x}px, ${starting_position_bug.y}px) scale(0.2)`;

      await new Promise((resolve) => setTimeout(resolve, 200));
      element.style.display = 'block';
      this.bugs[bugId].hidden = false;
    },

    async moveBug(bugId, bugx, bugy, bugangle) {

      if(this.bugs[bugId].dead){
        return;
      }

      if(this.bugs[bugId].hidden){

        await this.showBug(bugId);
        await this.moveBug(bugId, this.bugs[bugId].x, this.bugs[bugId].y, this.bugs[bugId].angle);
        return;
      }

      const element = document.getElementById(bugId);
      const line = document.getElementById('line');



      const starting_position_bug = {
        x: bugx,
        y: bugy
      };

      const container = document.getElementById("bugarea1"); // Replace with your actual container ID
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      console.log(containerWidth)
      console.log(containerHeight)

      const minDistanceFromEdge = 200;

      const maxX = containerWidth - minDistanceFromEdge;
      const maxY = containerHeight - minDistanceFromEdge;

      // const randomX = minDistanceFromEdge + Math.random() * (maxX - minDistanceFromEdge);
      // const randomY = minDistanceFromEdge + Math.random() * (maxY - minDistanceFromEdge);
      const randomX = minDistanceFromEdge + Math.random() * (maxX - minDistanceFromEdge * 2);
      const randomY = minDistanceFromEdge + Math.random() * (maxY - minDistanceFromEdge * 2);


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

      if(this.bugs[bugId].dead){
        return;
      }

      //setTimeout(() => {
      element.style.transition = `transform ${2000}ms ease-in-out`;
      element.style.transform = `translate(${starting_position_bug.x}px, ${starting_position_bug.y}px) rotate(${angleDeg + 90}deg) scale(0.2)`;
      element.style.transformOrigin = 'center center';

      if(this.bugs[bugId].dead){
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // setTimeout(() => {
      this.bugs[bugId].rotation_done = true;
      console.log("3")
      //},100);
      // },100);

      if(this.bugs[bugId].dead){
        return;
      }
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
        return;
      }

      // here we safe the new data in the old data
      await new Promise((resolve) => setTimeout(resolve, total_duration));
      console.log("this is the current data of the bug: x" + this.bugs[bugId].x + " y:" + this.bugs[bugId].y + " angle: " + this.bugs[bugId].angle);
      this.bugs[bugId].rotation_done = false;
      await this.moveBug(bugId, this.bugs[bugId].x, this.bugs[bugId].y, this.bugs[bugId].angle);



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
