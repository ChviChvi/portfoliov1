



export function blockNavigationWithDelay() {
    return function (to, from, next) {
        setTimeout(() => {
            next();
        }, 250); // change this to what the page transition needs to be
    };
}


