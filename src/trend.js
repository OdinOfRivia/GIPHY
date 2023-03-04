//  JS for trendPage here...

const templateGrid1 = document.querySelector("#trend-template");
const grid1 = document.querySelector("#trends");

console.log(templateGrid1);

// const key = "?api_key=EpaFLvbdU1y8QN2BH18EPGe86kSg8S77";
const key =
	"?api_key=NU4sW44isKZGQFbQjDanji7HIM4XYkpK"; /** This is Yuno's key for testing :) */
const limit = "&limit=15";
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

//  Get trend
const getTrend = async () => {
	const trendApi = trendUrl + key + limit + offset + rating + language;

	// send an HTTP GET request to the trending API using the sendHttpRequest function
	const response = await sendHttpRequest(trendApi, "GET");
	const responseData = response.data;
	console.log(responseData);

	/** Put the gifs in the list "grid-1" */
	if (responseData.length > 0) {
		for (let i = 0; i < responseData.length; i++) {
			const gifElClone = document.importNode(templateGrid1.content, true);
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
};

// get Trend gif when page is loaded
$(window).on("load", () => {
	getTrend();
});
