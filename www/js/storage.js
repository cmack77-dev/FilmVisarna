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


else if (uname == '') {
    $('#t3').after('<p class="formmsg">Ange Användarnamn*</p>');
  }
  else if (!letters.test(uname)) {
    replace
    $('#t3').after('<p class="formmsg">Användarnamn får endast innehålla vanliga tecken*</p>');else if (uname == '') {
    $('#t3').after('<p class="formmsg">Ange Användarnamn*</p>');
  }
  else if (!letters.test(uname)) {
    replace
    $('#t3').after('<p class="formmsg">Användarnamn får endast innehålla vanliga tecken*</p>');