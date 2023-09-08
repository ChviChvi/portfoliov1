



export function blockNavigationWithDelay() {
    return function (to, from, next) {
        setTimeout(() => {
            next();
        }, 750); // change this to what the page transition needs to be
    };
}


export function checkScroll() {
    return window.scrollY;
}

export default {
    data() {
        return {
            scrollPosition: 0, // Initialize scrollPosition
        };
    },
    mounted() {
        window.addEventListener("scroll", () => {
            this.scrollPosition = this.checkScroll(); // Call the function to update scrollPosition

            console.log("Scrolled: " + this.scrollPosition);

        });
    },
};