document.addEventListener("DOMContentLoaded", async function () {
    const best_movies_data = await get_movies(best_movies_url, 7);
    const best_movie_data = await get_movie_details(best_movies_data.shift());
    create_movie_section("main", "films-mieux-notes", "Films les mieux notés");
    display_best_movie(best_movie_data);
    display_movies("#films-mieux-notes .grid-movies", best_movies_data);

    const category1_movies = await get_movies(category1_movies_url, 6)
    create_movie_section("main", "categorie-1", category1);
    display_movies("#categorie-1 .grid-movies", category1_movies)

    const category2_movies = await get_movies(category2_movies_url, 6)
    create_movie_section("main", "categorie-2", category2);
    display_movies("#categorie-2 .grid-movies", category2_movies)

    const genres_list = await get_genres(genres_list_url)
    create_movie_section("main", "autre-categorie", "Autres :");
    create_category_select("autre-categorie");
    display_category_option("#select-categories", genres_list);
    
    document.querySelectorAll('.button-see-more').forEach(button => {
        const section = button.closest('section');
        const articles = section.querySelectorAll('.grid-movies article');
        let expanded = false;
    
        update_articles_display(button, articles, expanded);
    
        button.addEventListener('click', () => {
            expanded = !expanded;
            update_articles_display(button, articles, expanded);
        });
    
        window.addEventListener('resize', () => {
            if (!expanded) {
                update_articles_display(button, articles, expanded);
            }
        });
    });
});