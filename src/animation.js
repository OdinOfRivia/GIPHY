// gsap.from(".an1", { duration: 1,opacity:0 ,x: "-100%", ease: "steps (100)", stager: .5 });
// gsap.from(".an2", { duration: 1,opacity:0 ,x: "100%", ease: "steps (100)", stager: .5 });
// const timeline = gsap.timeline({defaults: {duration: 1}})

// gsap.registerPlugin(scrollTrigger);

const tl = gsap.timeline({
	defaults: {
		duration: 1,
		opacity: 0,
		x: "-100%",
		ease: "steps(100)",
		stager: 0.5,
	},
	scrollTrigger: {
		trigger: ".an1",
		start: "top 20%",
		end: "bottom 80%",
		// scrub: true,
		markers: false,
	},
});

// execute in main.js file
// tl.from('.an1', { stagger: 0.2 });

const tl2 = gsap.timeline({
	defaults: {
		duration: 1,
		opacity: 0,
		x: "100%",
		ease: "steps(100)",
		stager: 0.5,
	},
	scrollTrigger: {
		trigger: ".an2",
		start: "top 10%",
		end: "bottom 70%",
		// scrub: true,
		markers: false,
	},
});

// execute in main.js file
// tl2.from('.an2', { stagger: 0.2 });
