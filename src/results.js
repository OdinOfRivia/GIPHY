/////////////////////////////////
//  JS for Results page here...
/////////////////////////////////

$(document).ready(() => {
    /** select them to put gifs */
    const grid1 = document.querySelector("#trends");
    console.log(grid1);
    const templateGrid1 = document.querySelector("#trend-template");

    console.log(templateGrid1);

    /**Url for Search api */
    const searchUrl = "https://api.giphy.com/v1/gifs/search";

    // const key = "?api_key=EpaFLvbdU1y8QN2BH18EPGe86kSg8S77";
    const key =
        "?api_key=NU4sW44isKZGQFbQjDanji7HIM4XYkpK"; /** This is Yuno's key for testing :) */
    const limit = "&limit=15";
    const offset = "&offset=0";
    const rating = "&rating=g";
    const language = "&lang=en";

    /** Getting the Search box input field and Search Btn */
    const searchBox = document.querySelector("#search");
    const searchBtn = document.querySelector(".search-btn")

    // listening for click search button
    searchBtn.addEventListener("click", () => {
        // Checking if search value is empty or not
        if(searchBox.value.length == 0){
            alert('Please provide a query!')
        } else{
            // Passing the query value with the link
            const url = `/results.html?q=${searchBox.value}`
            document.location.href = url;
        }
    })

    // listening for enter press on search bar
    searchBox.addEventListener('keyup',function(e){
        if (e.keyCode === 13) {
            // Checking if search value is empty or not
            if(searchBox.value.length == 0){
                alert('Please provide a query!')
            } else{
                // Passing the query value with the link
                const url = `/results.html?q=${searchBox.value}`
                document.location.href = url;
            }
        }
    });


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

    // Define a function to search for gifs based on a keyword
    const searchGif = async (keyword) => {
        const limit = `&limit=15`;
        // use template literals to build the URL for the search API
        const url = `${searchUrl}${key}&q=${keyword}${limit}${offset}${rating}${language}`;

        // send an HTTP GET request to the search API using the sendHttpRequest function
        return sendHttpRequest(url, "GET");
    };

    // Search arrow function with using the parameters from url query parameters passed from search bar
    const getResultsFromUrlQuery = async (url) => {
        // getting the query
        let query = url.split("?q=")[1]
        const response = await searchGif(query)
        const responseData = response.data
        console.log(responseData);


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

            // Remove '%20' in query to display it as normal space inside of 'Results of: query' section
            $('#querySpan').append(query.replaceAll('%20', ' '));
        }
    }
    getResultsFromUrlQuery(window.location.href)
})