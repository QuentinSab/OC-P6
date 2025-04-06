function create_movie_section(container, id, title) {
    const template = document.getElementById("section-movie-template");
    const clone = template.content.cloneNode(true);

    clone.querySelector("section").id = id;
    clone.querySelector("h2").textContent = title;

    document.querySelector(container).appendChild(clone);
}

function create_movie_article(container, title, src, alt) {
    const template = document.getElementById("article-movie-template");
    const clone = template.content.cloneNode(true);

    const img = clone.querySelector("img");
    img.src = src;
    img.alt = alt;

    img.onerror = function () {
        this.onerror = null;
        this.src = "../img/default-image.png";
    };

    clone.querySelector("h3").textContent = title;

    document.querySelector(container).appendChild(clone);
}

function create_category_select(container_id) {
    const template = document.getElementById("select-category-template");
    const clone = template.content.cloneNode(true);

    const container = document.getElementById(container_id);
    const h2 = container.querySelector("h2");

    container.insertBefore(clone, h2.nextSibling);
}

function create_category_option(container, name, value = "") {
    const template = document.getElementById("option-category-template");
    const clone = template.content.cloneNode(true);

    const option = clone.querySelector("option");

    option.textContent = name;
    option.value = name.toLowerCase();

    document.querySelector(container).appendChild(clone);
}

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

function display_movies(selector, movies_data) {
    for (let movie of movies_data) {
        create_movie_article(selector, movie.title, movie.image_url, movie.title);
    }
}

function display_category_option(selector, genres_list) {
    for (let category of genres_list) {
        create_category_option(selector, category.name);
    }
}

function display_best_movie(best_movie_data) {
    document.querySelector(".best-movie-div h3").textContent = best_movie_data.title;
    document.getElementById("best-movie-poster").setAttribute("src", best_movie_data.image_url);
    document.querySelector(".best-movie-div p").textContent = best_movie_data.long_description;
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