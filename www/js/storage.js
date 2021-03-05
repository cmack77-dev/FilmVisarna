let storage = {
  selectedMovie: '',
  movies: [],
  vuxna: 0,
  pensionar: 0,
  barn: 0,
  realname: '',
  email: '',
  uname: '',
  pwd: '',
  cpwd: ''
}
async function initStorage () {
  storage.movies = await getMovies()
}
initStorage()
