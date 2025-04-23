function create_movie_section(container, id, title) {
    const template = document.getElementById("section-movie-template");
    const clone = template.content.cloneNode(true);

    clone.querySelector("section").id = id;
    clone.querySelector("h2").textContent = title;

    document.querySelector(container).appendChild(clone);
}

function create_movie_article(container, title, src, id) {
    const template = document.getElementById("article-movie-template");
    const clone = template.content.cloneNode(true);

    const img = clone.querySelector("img");
    img.src = src;
    img.alt = title;

    img.onerror = default_image_error;

    clone.querySelector("h3").textContent = title;
    clone.querySelector("button").dataset.id = id;

    document.querySelector(container).appendChild(clone);
}

function create_category_select(container_id) {
    const template = document.getElementById("select-category-template");
    const clone = template.content.cloneNode(true);
    const select = clone.querySelector("select");

    const container = document.getElementById(container_id);
    const h2 = container.querySelector("h2");

    const header_div = document.createElement("div");
    header_div.classList.add("section-header");

    container.insertBefore(header_div, h2);
    header_div.appendChild(h2);
    header_div.appendChild(select);
}

function create_category_option(container, name) {
    const template = document.getElementById("option-category-template");
    const clone = template.content.cloneNode(true);

    const option = clone.querySelector("option");

    option.textContent = name;
    option.value = name.toLowerCase();

    document.querySelector(container).appendChild(clone);
}

function display_movies(selector, movies_data) {
    for (let movie of movies_data) {
        create_movie_article(selector, movie.title, movie.image_url, movie.id);
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
    document.querySelector(".button-best-movie").dataset.id = best_movie_data.id;
}

async function display_modale_details(button) {
    const movie = await get_movie_details(button.dataset.id);

    const champs = [
        ["modale-titre", movie.title],
        ["modale-date", format_year(movie.date_published)],
        ["modale-genres", format_list(movie.genres)],
        ["modale-pegi", movie.rated + " - "],
        ["modale-duree", movie.duration + " minutes"],
        ["modale-pays", format_list_country(movie.countries)],
        ["modale-score", movie.imdb_score + "/10"],
        ["modale-boxoffice", format_boxoffice(movie.worldwide_gross_income)],
        ["modale-realisateur", movie.directors],
        ["modale-resume", movie.long_description],
        ["modale-actors", format_list(movie.actors)]
    ];

    champs.forEach(([id, key]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = key;
    });

    const image = document.getElementById("modale-affiche");
    image.src = movie.image_url;
    image.onerror = default_image_error;
}

function default_image_error(error) {
    error.target.onerror = null;
    error.target.src = "img/default-image.png";
}

function format_year(dateString) {
    return dateString.slice(0, 4) + " - ";
}
function format_list(list) {
    return list.join(", ");
}

function format_list_country(list) {
    return "(" + list.join(" / ") + ")";
}

function format_boxoffice(value) {
    if (typeof value !== "number" || isNaN(value)) {
        return "Inconnues";
    }

    return "$" + (value / 1000000).toFixed(1) + "m";
}
