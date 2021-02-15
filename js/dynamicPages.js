const dynamicPages = {
  "#start": () => `<div class="secondcolumn"></div>`,
  "#error": () => `<div class="secondcolumn">Något gick fel</div>`,
  "#about-us": () => () => $('main').load('/html-partials/about-us.html'),
  "#contact": () => () => $('main').load('/html-partials/contact.html'),

  "#filmer": async () => {
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

    let html = `<div class="secondcolumn"><div class="moviecolumn">`

    html += (
      `<div class="moviePicture"><img src="${movie.images}" id="moviePic"></div>

      <button onclick="toggleTrailer();" id="trailer-button"  type="button">Visa trailer</button>

      <div class="movie-information"> <div class="movie-information-label">Titel: </div> <div class="movie-information-value">${movie.title} </div></div>
      <div class="movie-information"> <div class="movie-information-label">Handling: </div> <div class="movie-information-value">${movie.description} </div></div>
      <div class="movie-information"> <div class="movie-information-label">Regissör: </div> <div class="movie-information-value">${movie.director} </div></div>
      <div class="movie-information"> <div class="movie-information-label">Skådespelare: </div> <div class="movie-information-value">${movie.actors} </div></div>
      <div class="movie-information"> <div class="movie-information-label">Språk: </div> <div class="movie-information-value">${movie.language} </div></div>

      <div class="trailer-container"><iframe id="trailer" src="${movie.youtubeTrailers}" allowfullscreen="true" allowscriptaccess="always"></iframe>
      <button onclick="toggleTrailer();" id="close-button">&times;</button></div>`
    )
    html += `</div></div>`
    return html
  }
}
