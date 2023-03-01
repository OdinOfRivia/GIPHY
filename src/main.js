// Cache the query selector calls
const menuBtn = document.querySelector(".menu-btn");
const burgerLine = document.querySelector(".menu-btn-burger");
const nav = document.querySelector(".nav");

const toggleMenu = () => {
  burgerLine.classList.toggle("open");
  nav.classList.toggle("open");
};

menuBtn.addEventListener("click", toggleMenu);

// Define the API URLs and request parameters using const
const searchUrl = "https://api.giphy.com/v1/gifs/search";
const trendUrl = "https://api.giphy.com/v1/gifs/trending";
const key = "?api_key=EpaFLvbdU1y8QN2BH18EPGe86kSg8S77";
const limit = "&limit=5";
const offset = "&offset=0";
const rating = "&rating=g";
const language = "&lang=en";

// Use template literals to build the URL
const trendApi = `${trendUrl}${key}${limit}${rating}${language}`;

// Use arrow function syntax for consistency
const sendHttpRequest = async (url, method, data) => {
  const headers = data ? { "Content-Type": "application/json" } : {};

  const response = await fetch(url, {
    method,
    headers,
    body: data && JSON.stringify(data),
  });

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

const getTrend = async () => {
  const responseData = await sendHttpRequest(trendApi, "GET");
  console.log(responseData);
  return responseData;
};

const searchGif = async (keyWord) => {
  const url = `${searchUrl}${key}&q=${keyWord}${limit}${offset}${rating}${language}`;
  const responseData = await sendHttpRequest(url, "GET");
  console.log(responseData);
  return responseData;
};

// Use arrow function syntax for consistency
$(window).on("load", () => {
  getTrend();
});