async function get_movies(url, movies_number) {
    let movies = [];
    data = await get_page(url);

    if (data.count < movies_number) {
        movies_number = data.count;
    }

    movies = add_movies(movies, data)

    while(movies.length < movies_number) {
        data = await get_page(data.next);
        movies = add_movies(movies, data)
    }
    
    return movies.slice(0, movies_number);
} 

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

async function get_genres(url) {
    let genres = [];
    data = await get_page(url);
    genres = add_genres(genres, data)
    while(data.next) {
        data = await get_page(data.next);
        genres = add_genres(genres, data)
    }
    return genres;
}

function add_genres(genres, data) {
    for (let i = 0; i < data.results.length; i++) {
        genres.push({
            id: data.results[i].id,
            name: data.results[i].name
        });
    }
    return genres;
}

function get_movie_details(movie_data) {
    const movie_url = api_url + "titles/" + movie_data.id;
    return get_page(movie_url)
}

function get_page(url) {
    return fetch(url)
        .then(check_response_status)
}

function check_response_status(response) {
    if (!response.ok) {
        throw new Error("Erreur HTTP : " + response.status);
    }
    return response.json();
}