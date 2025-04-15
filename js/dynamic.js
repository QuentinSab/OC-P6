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
        display_modale_details(button)
        const modal = document.querySelector(".modale-film");
        if (modal) {
            modal.style.display = "flex";
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