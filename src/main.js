// Cache the query selector calls to improve performance
// hamburger menu
const menuBtn = document.querySelector(".menu-btn");
const burgerLine = document.querySelector(".menu-btn-burger");
const nav = document.querySelector(".nav");

// Define a function to toggle the menu on click
const toggleMenu = () => {
  burgerLine.classList.toggle("open");
  nav.classList.toggle("open");
};

// Attach the toggleMenu function to the click event of the menu button
menuBtn.addEventListener("click", toggleMenu);

// Define the API URLs and request parameters using const to ensure they are not reassigned
const searchUrl = "https://api.giphy.com/v1/gifs/search";
const trendUrl = "https://api.giphy.com/v1/gifs/trending";
const key = "?api_key=EpaFLvbdU1y8QN2BH18EPGe86kSg8S77";
const limit = "&limit=5";
const offset = "&offset=0";
const rating = "&rating=g";
const language = "&lang=en";

// Use template literals to build the URL for the trending API
const trendApi = `${trendUrl}${key}${limit}${rating}${language}`;

// Use arrow function syntax for consistency and to simplify code
const sendHttpRequest = async (url, method, data) => {
  // define headers only if data is present to minimize object creation
  const headers = data ? { "Content-Type": "application/json" } : {};

  const response = await fetch(url, {
    method,
    headers,
    body: data && JSON.stringify(data),
  });

  // return the response data as JSON without logging it
  return await response.json();
};

// Define a function to fetch the most engaging gifs each day using the trending API
const getTrend = async () => {
  // send an HTTP GET request to the trending API using the sendHttpRequest function
  return sendHttpRequest(trendApi, "GET");
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
  getTrend().then((responseData) => {
    // log the response data for testing purposes
    console.log(responseData);
  }).catch((error) => {
    // handle any errors that occur during the HTTP request
    console.error(error);
  });
});

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
