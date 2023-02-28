// hamburger menu
const menuBtn = document.querySelector(".menu-btn");
const burgerLine = document.querySelector(".menu-btn-burger");
const nav = document.querySelector(".nav");

const toggleMenu = () => {
	burgerLine.classList.toggle("open");
	nav.classList.toggle("open");
};
menuBtn.addEventListener("click", toggleMenu);

/**Url for Search api */
const searchUrl = "https://api.giphy.com/v1/gifs/search";

/** Url for Trending api */
const trendUrl = "https://api.giphy.com/v1/gifs/trending";

/** Request params for api */
// Api key
const key = "?api_key=NU4sW44isKZGQFbQjDanji7HIM4XYkpK";

// Request Limit
const limit = "&limit=5";

// Offset
const offset = "&offset=0";

// Rating Category
const rating = "&rating=g";

// Language Request
const language = "&lang=en";

/** Url and request params for trend api */
const trendApi = trendUrl + key + limit + rating + language;

/** Function to send http request to the Giphy server */
async function sendHttpRequest(url, method, data) {
	return await fetch(url, {
		method,
		...(data && { headers: { "Content-Type": "application/json" } }),
		...(data && { body: JSON.stringify(data) }),
	}).then((d) => d.json());
}

/** Fetch the data of gifs which is most engaging content each and every day */
async function getTrend() {
	const responseData = await sendHttpRequest(trendApi, "GET");

	console.log(responseData); /** Testing the response data */
	// return responseData;
}

/** User can decide the keyword in the input field, and recieve it as an param "keyword"*/
async function searchGif(keyWord) {
	const url = `${searchUrl + key}&q=${keyWord}${
		limit + offset + rating + language
	}`;
	const responseData = await sendHttpRequest(url, "GET");

	console.log(responseData); /** Testing the response data */
	// return responseData;
}

/** Execute getTrend() when the page loaded so that user can see the popular gifs */
$(window).on("load", function () {
	getTrend();
});
