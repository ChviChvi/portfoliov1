



export function blockNavigationWithDelay() {
    return function (to, from, next) {
        setTimeout(() => {
            next();
        }, 250); // change this to what the page transition needs to be
    };
}


export function calculateRotationAngle(currentX, currentY, destinationX, destinationY) {
    const dx = destinationX - currentX;
    const dy = destinationY - currentY;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
}

