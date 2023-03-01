
const grid = document.querySelectorAll('.grid');
console.log();

// Define the scroll animation
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: grid,
    start: "top 80%",
    end: "bottom 20%",
    scrub: true
  }
});

// Add animation steps
tl.fromTo(grid, {y: "-100%"}, {y: "0%", duration: 1})
  .fromTo(grid.children, {opacity: 0, y: 50}, {opacity: 1, y: 0, stagger: 0.1, duration: 0.5});