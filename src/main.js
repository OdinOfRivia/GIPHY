// Main url
var api = 'https://api.giphy.com/v1/gifs/search'

// Api key
var key = '?api_key=EpaFLvbdU1y8QN2BH18EPGe86kSg8S77'

// Query
var query = '&q=Dogs' // Looking for dogs :)

// Request Limit
var limit = '&limit=25'

// Offset
var offset = '&offset=0'

// Rating Category
var rating = '&rating=g'

// Language Request
var language = '&lang=en'

// Url to Call
var url = api + key + query + limit + offset + rating + language

// Using Fetch to get the Data from the GIPHY API
const apiData = fetch(url)
.then((response) => response.json())
.then((data) => {

    // Check Data Response in Consolle guys
    console.log(data);
    
});