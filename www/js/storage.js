let storage = {
  selectedMovie: "",
  movies: [],
  vuxna:0,
  pensionar:0,
  barn:0
}
async function initStorage() {
  storage.movies = await getMovies();
}
initStorage();