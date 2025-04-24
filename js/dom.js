/* Create and insert a movie section in the specified container */
function create_movie_section(container, id, title) {
    const template = document.getElementById("section-movie-template");
    const clone = template.content.cloneNode(true);

    clone.querySelector("section").id = id;
    clone.querySelector("h2").textContent = title;

    document.querySelector(container).appendChild(clone);
}

/* Create and insert a movie article */
function create_movie_article(container, title, src, id) {
    const template = document.getElementById("article-movie-template");
    const clone = template.content.cloneNode(true);

    const img = clone.querySelector("img");
    img.src = src;
    img.alt = title;

    // Handle image loading errors by displaying a default image
    img.onerror = default_image_error;

    clone.querySelector("h3").textContent = title;
    clone.querySelector("button").dataset.id = id;

    document.querySelector(container).appendChild(clone);
}

/* Create and insert a category select element in the specified container */
function create_category_select(container_id) {
    const template = document.getElementById("select-category-template");
    const clone = template.content.cloneNode(true);

    const container = document.getElementById(container_id);
    const h2 = container.querySelector("h2");

    // Create a div to hold the title and select element
    const header_div = document.createElement("div");
    header_div.classList.add("other-category-header");

    container.insertBefore(header_div, h2);
    header_div.appendChild(h2);
    header_div.appendChild(clone);
}

/* Create and insert an option element in a container */
function create_category_option(container, name) {
    const template = document.getElementById("option-category-template");
    const clone = template.content.cloneNode(true);

    const option = clone.querySelector("option");

    option.textContent = name;
    option.value = name.toLowerCase();

    document.querySelector(container).appendChild(clone);
}

/* Insert a list of genre options in a container */
function display_category_option(container, genres_list) {
    for (let category of genres_list) {
        create_category_option(container, category.name);
    }
}

/* Display a list of movies inside the given container */
function display_movies(container, movies_data) {
    for (let movie of movies_data) {
        create_movie_article(container, movie.title, movie.image_url, movie.id);
    }
}

/* Display the best movie information in the dedicated section */
function display_best_movie(best_movie_data) {
    document.querySelector(".best-movie-div h3").textContent = best_movie_data.title;
    document.getElementById("best-movie-poster").setAttribute("src", best_movie_data.image_url);
    document.querySelector(".best-movie-div p").textContent = best_movie_data.long_description;
    document.querySelector(".button-best-movie").dataset.id = best_movie_data.id;
}

/* Fetch and display detailed information for a movie in a modal window */
async function display_modale_details(button) {
    const movie = await get_movie_details(button.dataset.id);

    // Array of elements to update with movie data
    const champs = [
        ["modale-titre", movie.title],
        ["modale-date", format_year(movie.date_published) + " - "],
        ["modale-genres", format_list(movie.genres)],
        ["modale-pegi", movie.rated + " - "],
        ["modale-duree", movie.duration + " minutes"],
        ["modale-pays", "(" + format_list_country(movie.countries) + ")"],
        ["modale-score", movie.imdb_score + "/10"],
        ["modale-boxoffice", format_boxoffice(movie.worldwide_gross_income)],
        ["modale-realisateur", movie.directors],
        ["modale-resume", movie.long_description],
        ["modale-actors", format_list(movie.actors)]
    ];

    // Loop through each element to update its content
    champs.forEach(([id, key]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = key;
    });

    // Update movie poster image
    const image = document.getElementById("modale-affiche");
    image.src = movie.image_url;
    image.onerror = default_image_error;
}

/* Format a date string to extract and return the year */
function format_year(dateString) {
    return dateString.slice(0, 4);
}

/* Format a list as separeted by coma */
function format_list(list) {
    return list.join(", ");
}

/* Format a list of countries separeted by slash */
function format_list_country(list) {
    return list.join(" / ");
}

/* Format box office value in millions, or display "Inconnues" if unavailable */
function format_boxoffice(value) {
    if (typeof value !== "number" || isNaN(value)) {
        return "Inconnues";
    }

    return "$" + (value / 1000000).toFixed(1) + "m";
}

/* Replace image with default if loading fails */
function default_image_error(error) {
    error.target.onerror = null;
    error.target.src = "img/default-image.png";
}