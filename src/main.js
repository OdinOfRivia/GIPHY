// hamburger menu
const menuBtn = document.querySelector(".menu-btn");
const burgerLine = document.querySelector(".menu-btn-burger");
const nav = document.querySelector(".nav");

/** Fetch count for infinite scroll*/
let fetchCount = 6;

/** select them to put gifs */
const grid1 = document.querySelector("#trends-container");
const templateGrid1 = document.querySelector("#trend-template");
const clips = document.querySelector("#clips-container");
const clipTemplate = document.querySelector("#clip-template");
const stories = document.querySelector("#stories-container");
const storyTemplate = document.querySelector("#story-template");
const artists = document.querySelector("#artists-container");
const artistTemplate = document.querySelector("#artist-template");

/** Getting the Search box input field and Search Btn */
const searchBox = document.querySelector("#search");
const searchBtn = document.querySelector(".search-btn");

// listening for click search button
searchBtn.addEventListener("click", () => {
	// Checking if search value is empty or not
	if (searchBox.value.length == 0) {
		alert("Please provide a query!");
	} else {
		// Passing the query value with the link
		const url = `/results.html?q=${searchBox.value}`;
		document.location.href = url;
	}
});

// listening for enter press on search bar
searchBox.addEventListener("keyup", function (e) {
	if (e.keyCode === 13) {
		// Checking if search value is empty or not
		if (searchBox.value.length == 0) {
			alert("Please provide a query!");
		} else {
			// Passing the query value with the link
			const url = `/results.html?q=${searchBox.value}`;
			document.location.href = url;
		}
	}
});

// Hamburger Toggle Menu && Listener
const toggleMenu = () => {
	burgerLine.classList.toggle("open");
	nav.classList.toggle("open");
};

menuBtn.addEventListener("click", toggleMenu);

/**Url for Search api */
const searchUrl = "https://api.giphy.com/v1/gifs/search";

// const key = "?api_key=EpaFLvbdU1y8QN2BH18EPGe86kSg8S77";
const key =
	"?api_key=NU4sW44isKZGQFbQjDanji7HIM4XYkpK"; /** This is Yuno's key for testing :) */
const offset = "&offset=0";
const rating = "&rating=g";
const language = "&lang=en";

/** Url for Trending api */
const trendUrl = "https://api.giphy.com/v1/gifs/trending";

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
const getTrend = async (count = 6) => {
	const limit = `&limit=${count}`;
	const trendApi = trendUrl + key + limit + offset + rating + language;
	// send an HTTP GET request to the trending API using the sendHttpRequest function
	await sendHttpRequest(trendApi, "GET").then((res) => {
		const responseData = res.data;
		if (responseData.length > 0) {
			for (let i = 0; i < responseData.length; i++) {
				const gifElClone = document.importNode(
					templateGrid1.content,
					true
				);
				if (i < 3) {
					gifElClone.querySelector("li").className = "an1";
				} else if (i >= 3) {
					gifElClone.querySelector("li").className = "an2";
				}
				gifElClone.querySelector("li").id = responseData[i].id;
				gifElClone.querySelector("img").src =
					responseData[i].images.original.url;

				grid1.appendChild(gifElClone);
			}
		}
		tl.from(".an1", { stagger: 0.2 });
		tl2.from(".an2", { stagger: 0.2 });
	});

	/** Put the gifs in the list "grid-1" */
	// if (responseData.length > 0) {
	// 	for (let i = 0; i < responseData.length; i++) {
	// 		const gifElClone = document.importNode(templateGrid1.content, true);
	// 		if (i < 3) {
	// 			gifElClone.querySelector("li").className = "an1";
	// 		} else if (i >= 3) {
	// 			gifElClone.querySelector("li").className = "an2";
	// 		}
	// 		gifElClone.querySelector("li").id = responseData[i].id;
	// 		gifElClone.querySelector("img").src =
	// 			responseData[i].images.original.url;

	// 		grid1.appendChild(gifElClone);
	// 	}
	// }
};

/** Get clips, stories, artists gifs  */
const getGifs = async (keyword, count = 6) => {
	const limit = `&limit=${count}`;
	const url = `${searchUrl}${key}&q=${keyword}${limit}${offset}${rating}${language}`;
	const response = await sendHttpRequest(url, "GET");
	const responseData = response.data;

	let parent;
	if (keyword === "clips") {
		parent = clips;
	} else if (keyword === "stories") {
		parent = stories;
	} else if (keyword === "artists") {
		parent = artists;
	}

	// Displaying the results from query inside of results page
	if (responseData.length > 0) {
		for (let i = 0; i < responseData.length; i++) {
			let gifElClone;
			if (keyword === "clips") {
				gifElClone = document.importNode(clipTemplate.content, true);
			} else if (keyword === "stories") {
				gifElClone = document.importNode(storyTemplate.content, true);
			} else if (keyword === "artists") {
				gifElClone = document.importNode(artistTemplate.content, true);
			}
			if (i < 3) {
				gifElClone.querySelector("li").className = "an1";
			} else if (i >= 3) {
				gifElClone.querySelector("li").className = "an2";
			}

			gifElClone.querySelector("li").id = responseData[i].id;
			gifElClone.querySelector("img").src =
				responseData[i].images.original.url;
			parent.appendChild(gifElClone);
		}
	}
};

// Define a function to search for gifs based on a keyword
const searchGif = async (keyword) => {
	const limit = `&limit=6`;
	// use template literals to build the URL for the search API
	const url = `${searchUrl}${key}&q=${keyword}${limit}${offset}${rating}${language}`;

	// send an HTTP GET request to the search API using the sendHttpRequest function
	return sendHttpRequest(url, "GET");
};

// Search arrow function with using the parameters from url query parameters passed from search bar
// const getResultsFromUrlQuery = async (url) => {
// 	// getting the query
// 	let query = url.split("?q=")[1];
// 	const response = await searchGif(query);
// 	const responseData = response.data;
// 	console.log(responseData);

// 	if (responseData.length > 0) {
// 		for (let i = 0; i < responseData.length; i++) {
// 			const gifElClone = document.importNode(templateGrid1.content, true);
// 			if (i < 3) {
// 				gifElClone.querySelector("li").className = "an1";
// 			} else if (i >= 3) {
// 				gifElClone.querySelector("li").className = "an2";
// 			}
// 			gifElClone.querySelector("li").id = responseData[i].id;
// 			gifElClone.querySelector("img").src =
// 				responseData[i].images.original.url;

// 			grid1.appendChild(gifElClone);
// 		}
// 	}
// };

/** Keep adding gifs until the API stop to gives us gifs */
const handleInfiniteScroll = (count, response, responseData) => {
	for (let i = count; i < response; i++) {
		const gifElClone = document.importNode(artistTemplate.content, true);
		if (i < count + 3) {
			gifElClone.querySelector("li").className = "an1";
		} else if (i >= count + 3) {
			gifElClone.querySelector("li").className = "an2";
		}

		gifElClone.querySelector("li").id = responseData[i].id;
		gifElClone.querySelector("img").src =
			responseData[i].images.original.url;

		artists.appendChild(gifElClone);
	}
	fetchCount += 6;
};

// Execute the getTrend function when the page is loaded using jQuery
$(window).on("load", () => {
	getTrend();
	getGifs("clips");
	getGifs("stories");
	getGifs("artists");
	// getResultsFromUrlQuery(
	// 	"https://www.encodedna.com/javascript/demo/check-if-url-contains-a-given-string-using-javascript.htm?q=dogs"
	// );
});

$(window).on("scroll", () => {
	const endOfPage =
		window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

	/** Fetching gifs using fetchCount and keyword */
	const fetchGifs = async (count, keyword) => {
		const limit = `&limit=${count + 6}`;
		const url = `${searchUrl}${key}&q=${keyword}${limit}${offset}${rating}${language}`;
		const response = await sendHttpRequest(url, "GET");
		const responseData = response.data;
		console.log(responseData);
		handleInfiniteScroll(fetchCount, responseData.length, responseData);
	};

	if (endOfPage) {
		fetchGifs(fetchCount, "artists");
	}
});
