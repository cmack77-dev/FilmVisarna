async function readJson(title) {
  let filmer = await $.getJSON('JSON-filer/filmer.json')
  showJsonAsHtml(filmer, title)
  getShows(title) //Markus har lagt in för att ropa på funktioner för bokning etc.
}

function showJsonAsHtml(filmer, wantedTitle) {
  let $film = $('<div class="moviecolumn"></div>')

  filmer
    .filter(film => film.title === wantedTitle)
    .forEach(film => {
      $film.append(
        `<section class="middleColumnChange"><div class="moviePicture"><img src="${film.images}" id="moviePic"></div> <button id="trailer-button" type="button">Play trailer</button> <div class="movieText"> <h3 id="titleName">${film.title}</h3> <p>Handling: ${film.description}</p> <p>Regissör: ${film.director}</p> <p>Skådespelare: ${film.actors}</p></div> </section>`
      )

      //   $('.secondcolumn').replaceWith($film)
      $('.secondcolumn').html($film);
      let $trailer = `<div class="trailer-container"><iframe id="trailer" src="${film.youtubeTrailers}" allowfullscreen></iframe><button id="close-button">&times;</button></div>`;

      // Funktion för att byta ut bilden mot en trailer.  EJ FÄRDIG!!!!
      $('body').on('click', '#trailer-button', () => {
        $('#moviePic').replaceWith($trailer);
      })
    })

}
