let storage = {
  selectedMovie: "",
  movies: [],

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // visningar = [],
  // title,
  // insertVar = '',
  // BS = [],
  // salongerx,
  // bioRum,
  // enteredName,
  // enteredPhone,
  // enteredMail,
  
  // chosenTheater,
  // date,
  // time,
  // movie,
  // seatNumbers,
  // seatNr,
  
  // salonger = [],
  // chosenShowID,
  // nrOfTickets = 15
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



}
async function initStorage() {
  storage.movies = await getMovies();
}
initStorage();