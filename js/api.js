/* Fetch a specified number of movies from an API endpoint */
async function get_movies(url, movies_number) {
    let movies = [];
    data = await get_page(url);  // Fetch the first page

    // Adjust the number of movies if fewer are available
    if (data.count < movies_number) {
        movies_number = data.count;
    }

    // Add movies from the first page
    movies = add_movies(movies, data);

    // Continue fetching next pages until enough movies are collected
    while (movies.length < movies_number) {
        data = await get_page(data.next);
        movies = add_movies(movies, data);
    }

    // Return the exact number of requested movies
    return movies.slice(0, movies_number);
}

/* Extract and store movies from API results */
function add_movies(movies, data) {
    for (let i = 0; i < data.results.length; i++) {
        movies.push({
            id: data.results[i].id,
            title: data.results[i].title,
            image_url: data.results[i].image_url
        });
    }
    return movies;
}

/* Fetch all genres from the API endpoint */
async function get_genres(url) {
    let genres = [];
    data = await get_page(url); // Fetch the first page

    genres = add_genres(genres, data); // Add genres from the first page

    // Continue fetching next pages if available
    while (data.next) {
        data = await get_page(data.next);
        genres = add_genres(genres, data);
    }
    return genres;
}

/* Extract and store genres from API results */
function add_genres(genres, data) {
    for (let i = 0; i < data.results.length; i++) {
        genres.push({
            id: data.results[i].id,
            name: data.results[i].name
        });
    }
    return genres;
}

/* Fetch detailed information about a single movie by ID */
function get_movie_details(id) {
    const movie_url = api_url + "titles/" + id;
    return get_page(movie_url);
}

/* Generic function to fetch data from an API endpoint */
function get_page(url) {
    return fetch(url)
        .then(check_response_status);
}

/* Check if the API response is OK and convert it to JSON */
function check_response_status(response) {
    if (!response.ok) {
        throw new Error("Erreur HTTP : " + response.status);
    }
    return response.json();
}
