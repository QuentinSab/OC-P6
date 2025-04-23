function see_more_behaviour(button) {
    const section = button.closest("section");
    const articles = section.querySelectorAll(".grid-movies article");
    let expanded = false;

    update_articles_display(button, articles, expanded);

    button.addEventListener("click", () => {
        expanded = !expanded;
        update_articles_display(button, articles, expanded);
    });

    window.addEventListener("resize", () => {
        if (!expanded) {
            update_articles_display(button, articles, expanded);
        }
    });
}

function details_behaviour(button) {
    button.addEventListener("click", () => {
        display_modale_details(button);
        const modal = document.querySelector(".modale-film");
        if (modal) {
            modal.style.display = "flex";
        }
    });
}

function modale_auto_close(modal) {
    const modal_content = modal.querySelector(".modale-contenu");

    modal.addEventListener("click", (event) => {
        if (!modal_content.contains(event.target)) {
            modal.style.display = "none";
        }
    });
}

function close_modale_behaviour(button) {
    button.addEventListener("click", () => {
        const modal = document.querySelector(".modale-film");
        if (modal) {
            modal.style.display = "none";
        }
    });
}

function select_category_behavior(select) {
    select.addEventListener("change", async () => {
        const active_category = select.options[select.selectedIndex].value;

        Array.from(select.options).forEach(option => {
            option.textContent = option.textContent.replace(" ✅", "");
        });

        const selected_option = select.options[select.selectedIndex];
        selected_option.textContent = selected_option.textContent + " ✅";

        const grid_movies = document.querySelector("#autre-categorie .grid-movies");
        grid_movies.innerHTML = "";

        const other_movies = await get_movies(category_movies_url + active_category, 6);
        display_movies("#autre-categorie .grid-movies", other_movies);

        document.querySelectorAll("#autre-categorie .button-see-more").forEach(see_more_behaviour);
        document.querySelectorAll("#autre-categorie .button-details").forEach(details_behaviour);
    });
}

function update_articles_display(button, articles, expanded) {
    let visible_article_count;
    if (expanded) {
        visible_article_count = 6;
        button.textContent = "Voir moins";
    } else {
        visible_article_count = get_default_number_articles();
        button.textContent = "Voir plus";
    }

    articles.forEach((article, index) => {
        if (index < visible_article_count) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}

function get_default_number_articles() {
    const width = window.innerWidth;
    if (width < 577) {
        return 2;
    }
    if (width < 769) {
        return 4;
    }
    return 6;
}
