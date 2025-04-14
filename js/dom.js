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
