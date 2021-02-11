async function readJson(title) {
  let filmer = await $.getJSON('JSON-filer/filmer.json')
  showJsonAsHtml(filmer, title)
  getShows(title) //Markus har lagt in för att ropa på funktioner för bokning etc.
}
function toggle() {
  let trailer = document.querySelector('.trailer-container')
  trailer.classList.toggle('active')

  let video = $('#trailer').attr('src');
  $('#trailer').attr('src', "");
  $('#trailer').attr('src', video);
}

function showJsonAsHtml(filmer, wantedTitle) {
  let $film = $('<div class="moviecolumn"></div>')

  filmer
    .filter(film => film.title === wantedTitle)
    .forEach(film => {
      $film.append(
        `<section class="middleColumnChange">

        <div class="moviePicture"><img src="${film.images}" id="moviePic"></div> 

        <button onclick="toggle();" id="trailer-button"  type="button">Visa trailer</button>

        <div class="movie-information"> <div class="movie-information-label">Titel: </div> <div class="movie-information-value">${film.title} </div></div>
        <div class="movie-information"> <div class="movie-information-label">Handling: </div> <div class="movie-information-value">${film.description} </div></div>
        <div class="movie-information"> <div class="movie-information-label">Regissör: </div> <div class="movie-information-value">${film.director} </div></div>
        <div class="movie-information"> <div class="movie-information-label">Skådespelare: </div> <div class="movie-information-value">${film.actors} </div></div>
        <div class="movie-information"> <div class="movie-information-label">Språk: </div> <div class="movie-information-value">${film.language} </div></div>
               
        <div class="trailer-container"><iframe id="trailer" src="${film.youtubeTrailers}" allowfullscreen="true" allowscriptaccess="always"></iframe>
        <button onclick="toggle();" id="close-button">&times;</button></div> </section>`
      )


      $('.secondcolumn').html($film);

    })

}
