let vuxna;
let barn;
let pensionar;
let url1 = `#bokning?`

const dynamicPages = {
  // "#start": () => `<div class="secondcolumn"></div>`,
  "#error": () => `<div class="secondcolumn">Något gick fel</div>`,
  "#about-us": () => () => $('main').load('/html-partials/about-us.html'),
  "#contact": () => () => $('main').load('/html-partials/contact.html'),
  "#login": () => () => $('main').load('/html-partials/login.html'),
  "#registration": () => () => $('main').load('/html-partials/registration.html'),

  "#start": async () => {
    let movies = await getMovies()
    let html = `<div class="secondcolumn"><div class="filmObj"><h2>Aktuella Filmer</h2>`

    movies.forEach(movie => {
      let url = `#detailedView?${encodeURI(movie.title)}`
      html += (
        `<div class="movieFrame">
        <a href="${url}"><img src="${movie.images}" id="moviePictureLink"><button id="moviePictureButton">Hitta biljetter</button></a></div>`
      )
    })
    html += `</div></div>`
    return html
  },

  "#detailedView": async () => {
    let movie = storage.movies.filter(mov => mov.title === decodeURI(window.location.hash.split("?")[1]))[0]
    storage.selectedMovie = movie.title;
    url1 = `#bokning?`
    url2 = `#schema?`
    let html = `<div class="secondcolumn"><div class="moviecolumn">`

    html += (
      `<div class="moviePicture"><img src="${movie.images}" id="moviePic">
      
      <div class="movie-info">
      <h3>${movie.title}</h3>
      <div class="movie-title-info"><p>${movie.genre}</p>
      <p class="movie-age">${movie.length} | ${movie.age}</p>
      
      <div class="buttons-movie-info"><button onclick="toggleTrailer();" id="trailer-button" type="button">Visa trailer</button>
      <a href="${url1}"><button id="book-tickets" type="button">Boka biljetter</button></a>
      </div>
      </div>
      </div>
      </div>
      <span>
      <hr> 
      <div class="movie-information"> <div class="movie-information-label"></div> <div class="movie-information-value">${movie.description} </div></div>
      <div class="movie-information"> <div class="movie-information-label">Regissör: </div> <div class="movie-information-value">${movie.director} </div></div>
      <div class="movie-information"> <div class="movie-information-label">Skådespelare: </div> <div class="movie-information-value">${movie.actors} </div></div>
      <div class="movie-information"> <div class="movie-information-label">Språk: </div> <div class="movie-information-value">${movie.language} </div></div>
      <div class="trailer-container"><iframe id="trailer" src="${movie.youtubeTrailers}" allowfullscreen="true" allowscriptaccess="always"></iframe>
      <button onclick="toggleTrailer();" id="close-button">&times;</button></div>
      `
    )
    html += `</div></div>`
    return html
  },

  "#bokning": (readNumbers) => {
    //readNumbers()
    let html = `<div class="secondcolumn"><form class="dropdown-form">`
    html += `
    <button onclick="getShows();">Visa när filmen går</button><br>
      <div class="partTwoSecondColumn" style="display:none;">
      <div class="schema">
        <p class="schemarubrik"></p>
        <div class="schedule"></div>
        <div align="center" class="seatingBooking">
          <p class="film"></p>
          <p class="salong"></p>
          <p class="dateTime"></p>
          <p class="nrSeats"></p>
          <div class="summaryTickets"></div>
          <div class="movieScreen" align="center">
            <p>Bioduken</p>
            </div></div></div></div>`
    html += `</form ></div > `
    setTimeout(readNumbers, 0)
    return html
    function readNumbers() {
      $('.secondcolumn form').prepend('<div class="ticketType"></div>')
      $('.ticketType').append(`
  <H4>Välj antal biljetter<br></H4>
  <select id=dropdown-vuxna  ><option value="" disabled selected>Vuxna</option></select>
  <select id=dropdown-barn  ><option value="" disabled selected>Barn</option></select>
  <select id=dropdown-pensionar  ><option value="" disabled selected>Pensionär</option></select>
  `)

      for (let antal = 1; antal < 21; antal++) {

        $('#dropdown-vuxna').append(`<option value="${antal}"> ${antal} </option>`)
        $('#dropdown-barn').append(`<option value="${antal}"> ${antal} </option>`)
        $('#dropdown-pensionar').append(`<option value="${antal}"> ${antal} </option>`)

      }

    }

  }

}

registration();
