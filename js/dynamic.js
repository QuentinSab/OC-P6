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

function update_articles_display(button, articles, expanded) {
    let visibleCount;
    if (expanded) {
        visibleCount = 6;
        button.textContent = 'Voir moins';
    } else {
        visibleCount = get_default_number_articles();
        button.textContent = 'Voir plus';
    }

    articles.forEach((article, index) => {
        if (index < visibleCount) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}