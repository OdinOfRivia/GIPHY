// hamburger menu
const menuBtn = document.querySelector(".menu-btn");
const burgerLine = document.querySelector(".menu-btn-burger");
const nav = document.querySelector(".nav");

/** select them to put gifs */
const templateGrid1 = document.querySelector("#template1");
const grid1 = document.querySelector(".grid-1");
const clips = document.querySelector("#clips");
const clipTemplate = document.querySelector("#clip-template");
const stories = document.querySelector("#stories");
const storyTemplate = document.querySelector("#story-template");
const artists = document.querySelector("#artists");
const artistTemplate = document.querySelector("#artist-template");

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
const limit = "&limit=9";
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
const getTrend = async () => {
  const trendApi = trendUrl + key + limit + offset + rating + language;
  // send an HTTP GET request to the trending API using the sendHttpRequest function
  const response = await sendHttpRequest(trendApi, "GET");
  const responseData = response.data;

  /** Put the gifs in the list "grid-1" */
  if (responseData.length > 0) {
    for (let i = 0; i < responseData.length; i++) {
      const gifElClone = document.importNode(templateGrid1.content, true);
      gifElClone.querySelector("li.an1").id = responseData[i].id;
      gifElClone.querySelector("img").src = responseData[i].images.original.url;
      grid1.appendChild(gifElClone);
    }
  }
};

/** Get clips, stories, artists gifs  */
const getGifs = async (keyword) => {
  const url = `${searchUrl}${key}&q=${keyword}${limit}${offset}${rating}${language}`;
  const response = await sendHttpRequest(url, "GET");
  const responseData = response.data;

  /**  */
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
      gifElClone.querySelector("li").id = responseData[i].id;
      gifElClone.querySelector("img").src = responseData[i].images.original.url;

      if (keyword === "clips") {
        clips.appendChild(gifElClone);
      } else if (keyword === "stories") {
        stories.appendChild(gifElClone);
      } else if (keyword === "artists") {
        artists.appendChild(gifElClone);
      }
    }
  }
};

// Define a function to search for gifs based on a keyword
const searchGif = async (keyword) => {
  // use template literals to build the URL for the search API
  const url = `${searchUrl}${key}&q=${keyword}${limit}${offset}${rating}${language}`;

  // send an HTTP GET request to the search API using the sendHttpRequest function
  return sendHttpRequest(url, "GET");
};

// Execute the getTrend function when the page is loaded using jQuery
$(window).on("load", () => {
  getTrend();
  getGifs("clips");
  getGifs("stories");
  getGifs("artists");
});
