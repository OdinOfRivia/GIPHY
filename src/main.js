// hamburger menu
const menuBtn = document.querySelector(".menu-btn");
const burgerLine = document.querySelector(".menu-btn-burger");
const nav = document.querySelector(".nav");

const toggleMenu = () => {
	burgerLine.classList.toggle("open");
	nav.classList.toggle("open");
};

menuBtn.addEventListener("click", toggleMenu);
