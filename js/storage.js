let storage = {
  selectedMovie: "",
  movies: []

}
async function initStorage() {
  storage.movies = await getMovies();
}
initStorage();