let url1 = `#bokning?`

const dynamicPages = {
  '#error': () => `<div class="secondcolumn">Något gick fel</div>`,
  '#about-us': () => () => $('main').load('/html-partials/about-us.html'),
  '#contact': () => () => $('main').load('/html-partials/contact.html'),
  '#login': () => () => $('main').load('/html-partials/login.html'),
  '#registration': () => () => $('main').load('/html-partials/registration.html'),
  '#mypages': () => () => $('main').load('/html-partials/mypages.html'),

  '#start': async () => {
    let movies = await getMovies()
    let html = `<div class="secondcolumn"><h2>Aktuella Filmer</h2><div class="filmObj">`

    movies.forEach(movie => {
      let url = `#detailedView?${encodeURI(movie.title)}`
      html += `<div class="movieFrame">
        <a href="${url}"><img src="${movie.images}" id="moviePictureLink"><button id="moviePictureButton">Hitta biljetter</button></a></div>`
    })
    html += `</div></div>`
    return html
  },

  '#detailedView': async () => {
    let movie = storage.movies.filter(
      mov => mov.title === decodeURI(window.location.hash.split('?')[1])
    )[0]
    storage.selectedMovie = movie.title
    url1 = `#bokning?`
    let html = `<div class="secondcolumn"><div class="moviecolumn">`

    html += `<div class="moviePicture"><img src="${movie.images}" id="moviePic">
      
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
      <div class="movie-information"> <div class="movie-information-label"></div> <div class="movie-information-value"><p>${movie.description}</p> </div></div>
      <div class="movie-information"> <div class="movie-information-label">Regissör: </div> <div class="movie-information-value"><p>${movie.director}</p> </div></div>
      <div class="movie-information"> <div class="movie-information-label">Skådespelare: </div> <div class="movie-information-value"><p>${movie.actors}</p> </div></div>
      <div class="movie-information"> <div class="movie-information-label">Språk: </div> <div class="movie-information-value"><p>${movie.language}</p> </div></div>
      <div class="trailer-container"><iframe id="trailer" src="${movie.youtubeTrailers}" allowfullscreen="true" allowscriptaccess="always"></iframe>
      <button onclick="toggleTrailer();" id="close-button">&times;</button></div>
      `
    html += `</div></div>`
    return html
  },

  '#bokning': readNumbers => {
    let html = `<div class="secondcolumn"><form class="dropdown-form">`
    html += `<br><div class="partTwoSecondColumn" style="display:none;">
      <div class="schema">
        <p class="schemarubrik"></p>
        <div class="schedule"></div>
        <div align="center" class="seatingBooking">
          <p class="film"></p>
          <p class="salong"></p>
          <p class="dateTime"></p>
          <p class="nrSeats"></p>
          <p class="nrTickets"></p>
          <div class="summaryTickets"></div>
          <div class="movieScreen" align="center">
            <p>Bioduken</p>
            </div></div></div></div>`
    html += `</form ></div > `
    setTimeout(readNumbers, 0)
    return html
    async function readNumbers() {
      $('.secondcolumn form').prepend('<div class="ticketType"></div>')
      $('.ticketType').append(`

  <h4>Välj film i listan</h4>
  <select id=movie-list><option value="0" disabled selected>-</option></select>
  
  <h4>Välj antal biljetter<br></h4>

  <li class="ticket-number">
  <div class="ticketnlabels">
  <p class="biljett-rubrik">Vuxna</p>
  <p class="pris">85kr/st</p>
  </div>
  <div class="select-tickets">
  <select id=dropdown-vuxna  ><option value="0" disabled selected>-</option></select>
  </div>
  </li>
  
  <li class="ticket-number">
  <div class="ticketnlabels">
  <p class="biljett-rubrik">Barn</p>
  <p class="pris">65kr/st</p>
  </div>
  <div class="select-tickets">
  <select id=dropdown-barn  ><option value="0" disabled selected>-</option></select>
  </div>
  </li>

  <li class="ticket-number">
  <div class="ticketnlabels">
  <p class="biljett-rubrik">Pensionär</p>
  <p class="pris">75kr/st</p>
  </div>
  <div class="select-tickets">
  <select id=dropdown-pensionar  ><option value="0" disabled selected>-</option></select>
  </div>
  </li>

  <br><br><button onclick='getShows()' id="show-screenings">Visa när filmen går</button>
  `)

      for (let antal = 1; antal < 21; antal++) {
        $('#dropdown-vuxna').append(
          `<option value="${antal}"> ${antal} </option>`
        )
        $('#dropdown-barn').append(
          `<option value="${antal}"> ${antal} </option>`
        )
        $('#dropdown-pensionar').append(
          `<option value="${antal}"> ${antal} </option>`
        )
      }
      let movies = await getMovies()
      movies.forEach(movie => {
        $('#movie-list').append(
          `<option value="${movie.title}"> ${movie.title} </option>`
        )
      })
    }
  },
  '#mypages': async () => {

    let html = `<div class="secondcolumn"><div class="h-tag"><h4>Aktuella bokningar
            <img src="images/FVwhite.png" alt="FV" class="fvpic"></h4>
            </div>`
    let loginName = $('#t3').val()
    let loginPW = $('#t4').val()
    let dbname = await db.run(
    /*SQL*/`
    SELECT * FROM users`
    );

    for (let userName of dbname) {
      if (loginName === userName.uname && loginPW === userName.password) {

        // window.location = '#mypages'

        let dbmovie = await db.run(/*SQL*/`
        SELECT *
        FROM bokningar`);

        for (let bokningar of dbmovie) {
          if (bokningar.email === userName.uemail) {

            html += `
            <div class="aktuellaBokningar"><p>Du har bokat filmen ${bokningar.movie} på ${bokningar.theater} med plats ${bokningar.seatnr} datum ${bokningar.date} klockan ${bokningar.time} </p>`
          }
        }
        html += `</div</div>`
        return html;
      }
    }
  }
}