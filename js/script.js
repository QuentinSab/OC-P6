/* Wait until the DOM is fully loaded */
document.addEventListener("DOMContentLoaded", async function () {

    /* Fetch and display top-rated movies*/
    const best_movies_data = await get_movies(best_movies_url, 7);
    const best_movie_data = await get_movie_details(best_movies_data.shift().id);

    create_movie_section("main", "films-mieux-notes", "Films les mieux notés");
    display_best_movie(best_movie_data);
    display_movies("#films-mieux-notes .grid-movies", best_movies_data);

    /* Fetch and display movies by predefined categories */
    const category1_movies = await get_movies(category1_movies_url, 6);
    create_movie_section("main", "categorie-1", category1);
    display_movies("#categorie-1 .grid-movies", category1_movies);

    const category2_movies = await get_movies(category2_movies_url, 6);
    create_movie_section("main", "categorie-2", category2);
    display_movies("#categorie-2 .grid-movies", category2_movies);

    /* Create and display category "Autres" */
    const genres_list = await get_genres(genres_list_url);
    create_movie_section("main", "autre-categorie", "Autres :");
    create_category_select("autre-categorie");
    display_category_option("#select-categories", genres_list);

    const active_category = genres_list[0].name; // Use the first genre as default
    const other_movies = await get_movies(category_movies_url + active_category, 6);
    display_movies("#autre-categorie .grid-movies", other_movies);

    /* Add event behaviors to interactive buttons */
    document.querySelectorAll(".button-see-more").forEach(see_more_behaviour);
    document.querySelectorAll(".button-details").forEach(details_behaviour);
    document.querySelectorAll(".modale-fermer").forEach(close_modale_behaviour);
    modale_auto_close(document.querySelector(".modale-film"));

    /* Category selection interaction */
    select_category_behavior(document.getElementById("select-categories"));
});
