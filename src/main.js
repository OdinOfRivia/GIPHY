// hamburger menu
const menuBtn = document.querySelector(".menu-btn");
const burgerLine = document.querySelector(".menu-btn-burger");
const nav = document.querySelector(".nav");
const templateGrid1 = document.querySelector("#template1");
const grid1 = document.querySelector(".grid-1");
const clips = document.querySelector("#clips");
const clipTemplate = document.querySelector("#clipTemplate");

const toggleMenu = () => {
	burgerLine.classList.toggle("open");
	nav.classList.toggle("open");
};

menuBtn.addEventListener("click", toggleMenu);

/**Url for Search api */
const searchUrl = "https://api.giphy.com/v1/gifs/search";
const trendUrl = "https://api.giphy.com/v1/gifs/trending";
// const key = "?api_key=EpaFLvbdU1y8QN2BH18EPGe86kSg8S77";
const key =
	"?api_key=NU4sW44isKZGQFbQjDanji7HIM4XYkpK"; /** This is Yuno's key for testing :) */
const limit = "&limit=9";
const offset = "&offset=0";
const rating = "&rating=g";
const language = "&lang=en";

// Use arrow function syntax for consistency and to simplify code
const sendHttpRequest = async (url, method, data) => {
	// define headers only if data is present to minimize object creation
	const headers = data ? { "Content-Type": "application/json" } : {};

	/** Change response to the json and handle the error in one place */
	return (response = await fetch(url, {
		method,
		headers,
		body: data && JSON.stringify(data),
	})
		.then((d) => d.json())
		.catch((error) => console.log(error)));
};

// Define a function to fetch the most engaging gifs each day using the trending API
const getTrend = async () => {
	// send an HTTP GET request to the trending API using the sendHttpRequest function
	const response = await sendHttpRequest(trendApi, "GET");
	const responseData = response.data;

	/** Put the gifs in the list "grid-1" */
	if (responseData.length > 0) {
		for (let i = 0; i < responseData.length; i++) {
			const gifElClone = document.importNode(templateGrid1.content, true);
			gifElClone.querySelector("li").id = responseData[i].id;
			gifElClone.querySelector("img").src =
				responseData[i].images.original.url;
			grid1.appendChild(gifElClone);
		}
	}
};

const getClips = async () => {
	const url = `${searchUrl}${key}&q=clips${limit}${offset}${rating}${language}`;
	const response = await sendHttpRequest(url, "GET");
	const responseData = response.data;

	/**  */
	if (responseData.length > 0) {
		for (let i = 0; i < responseData.length; i++) {
			const gifElClone = document.importNode(clipTemplate.content, true);
			gifElClone.querySelector("li.r1").id = responseData[i].id;
			gifElClone.querySelector("img").src =
				responseData[i].images.original.url;
			clips.appendChild(gifElClone);
		}
	}
};

// Define a function to search for gifs based on a keyword
const searchGif = async (keyWord) => {
	// use template literals to build the URL for the search API
	const url = `${searchUrl}${key}&q=${keyWord}${limit}${offset}${rating}${language}`;

	// send an HTTP GET request to the search API using the sendHttpRequest function
	return sendHttpRequest(url, "GET");
};

// Execute the getTrend function when the page is loaded using jQuery
$(window).on("load", () => {
	getTrend();
	getClips();
});
