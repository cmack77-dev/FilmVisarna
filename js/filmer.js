async function readJson(title) {
  let filmer = await $.getJSON('JSON-filer/filmer.json')
  showJsonAsHtml(filmer, title)
  getShows(title) //Markus har lagt in för att ropa på funktioner för bokning etc.
}
function toggle() {
  let trailer = document.querySelector('.trailer-container')
  trailer.classList.toggle('active')

  $('#close-button').on('click', () => {
    $('#trailer')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
  })

}

function showJsonAsHtml(filmer, wantedTitle) {
  let $film = $('<div class="moviecolumn"></div>')

  filmer
    .filter(film => film.title === wantedTitle)
    .forEach(film => {
      $film.append(
        `<section class="middleColumnChange"><div class="moviePicture"><img src="${film.images}" id="moviePic"></div> <button onclick="toggle();" id="trailer-button"  type="button">Play trailer</button> <div class="movieText"> <h3 id="titleName">${film.title}</h3> <p>Handling: ${film.description}</p> <p>Regissör: ${film.director}</p> <p>Skådespelare: ${film.actors}</p></div> <div class="trailer-container"><iframe id="trailer" src="${film.youtubeTrailers}" allowfullscreen="true" allowscriptaccess="always"></iframe><button onclick="toggle();" id="close-button">&times;</button></div> </section>`
      )
      //   $('.secondcolumn').replaceWith($film)
      $('.secondcolumn').html($film);

      // let $trailer = `<div class="trailer-container"><iframe id="trailer" src="${film.youtubeTrailers}" allowfullscreen></iframe><button id="close-button">&times;</button></div>`;  

      // $('body').on('click', '#trailer-button', () => {
      //   $('#moviePic').replaceWith($trailer);
      // })
    })

}
