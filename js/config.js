const api_url = "http://localhost:8000/api/v1/";

const category1 = "Action";
const category2 = "Romance";

const best_movies_url = api_url + "titles/?sort_by=-imdb_score";

const category1_movies_url = best_movies_url + "&genre=" + category1
const category2_movies_url = best_movies_url + "&genre=" + category2

const genres_list_url = api_url + "genres/";
