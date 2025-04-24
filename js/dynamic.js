/* Handle the "See more / See less" button behavior */
function see_more_behaviour(button) {
    const section = button.closest("section");
    const articles = section.querySelectorAll(".grid-movies article");
    let expanded = false;

    // Display a limited number of articles
    update_articles_display(button, articles, expanded);

    // Toggle article display on button click
    button.addEventListener("click", () => {
        expanded = !expanded;
        update_articles_display(button, articles, expanded);
    });

    // Adjust displayed articles number on window resize
    window.addEventListener("resize", () => {
        if (!expanded) {
            update_articles_display(button, articles, expanded);
        }
    });
}

/* Handle the "Details" button behavior by displaying the movie modal */
function details_behaviour(button) {
    button.addEventListener("click", () => {
        display_modale_details(button);
        const modal = document.querySelector(".modale-film");
        if (modal) {
            modal.style.display = "flex";
        }
    });
}

/* Close the modal when clicking outside its content */
function modale_auto_close(modal) {
    const modal_content = modal.querySelector(".modale-contenu");

    modal.addEventListener("click", (event) => {
        if (!modal_content.contains(event.target)) {
            modal.style.display = "none";
        }
    });
}

/* Close the modal when clicking on the button */
function close_modale_behaviour(button) {
    button.addEventListener("click", () => {
        const modal = document.querySelector(".modale-film");
        if (modal) {
            modal.style.display = "none";
        }
    });
}

/* Handle behavior when a category is selected from the select element */
function select_category_behavior(select) {
    select.addEventListener("change", async () => {
        const active_category = select.options[select.selectedIndex].value;

        // Remove previous "✅" markers from all options
        Array.from(select.options).forEach(option => {
            option.textContent = option.textContent.replace(" ✅", "");
        });

        // Mark the selected option with "✅"
        const selected_option = select.options[select.selectedIndex];
        selected_option.textContent = selected_option.textContent + " ✅";

        // Clear current movie grid
        const grid_movies = document.querySelector("#autre-categorie .grid-movies");
        grid_movies.innerHTML = "";

        // Fetch and display 6 movies for the selected category
        const other_movies = await get_movies(category_movies_url + active_category, 6);
        display_movies("#autre-categorie .grid-movies", other_movies);

        // Re-apply behaviors to new elements
        document.querySelectorAll("#autre-categorie .button-see-more").forEach(see_more_behaviour);
        document.querySelectorAll("#autre-categorie .button-details").forEach(details_behaviour);
    });
}

/* Show or hide a number of articles based on the button state */
function update_articles_display(button, articles, expanded) {
    let visible_article_count;

    if (expanded) {
        visible_article_count = 6;
        button.textContent = "Voir moins";
    } else {
        visible_article_count = get_default_number_articles();
        button.textContent = "Voir plus";
    }

    // Shows the number of articles desired
    articles.forEach((article, index) => {
        if (index < visible_article_count) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}

/* Determine the default number of articles to show based on screen width */
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
