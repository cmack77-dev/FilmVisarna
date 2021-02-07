async function readJson (title) {
  let filmer = await $.getJSON('JSON-filer/filmer.json')
  showJsonAsHtml(filmer, title)
  getShows(title) //Markus har lagt in för att ropa på funktioner för bokning etc.
}

function showJsonAsHtml (filmer, wantedTitle) {
  let $film = $('<div class="moviecolumn"></div>')

  filmer
    .filter(film => film.title === wantedTitle)
    .forEach(film => {
      $film.append(
        `<section class="middleColumnChange"><div id="movieText"> <h3 id="titleName">${film.title}</h3> <p>Handling: ${film.description}</p> <p>Regissör: ${film.director}</p> <p>Skådespelare: ${film.actors}</p> </div> <div id="moviePicture"><img src="${film.images}" id="moviePic"></div> <div> <iframe id="trailer" src="${film.youtubeTrailers}" allowfullscreen></iframe> </div></section>`
      )
      $('.moviecolumn').replaceWith($film)
      // $('.secondcolumn').html($film);
    })
}
