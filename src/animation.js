gsap.from(".an1", {
	duration: 1,
	opacity: 0,
	x: "-100%",
	ease: "steps (100)",
	stager: 0.5,
});
gsap.from(".an2", {
	duration: 1,
	opacity: 0,
	x: "100%",
	ease: "steps (100)",
	stager: 0.5,
});
