async function readJson(title) {
  let filmer = await $.getJSON('JSON-filer/filmer.json');
  showJsonAsHtml(filmer, title);

}

function showJsonAsHtml(filmer, wantedTitle) {
  let $film = $('<div class="secondcolumn"></div>');

  filmer.filter(film => film.title === wantedTitle)
    .forEach(film => {
      $film.append(`<div> <h3 id="titleName">${film.title}</h3> <p>Handling: ${film.description}</p> <p>Regissör: ${film.director}</p> <p>Skådespelare: ${film.actors}</p> </div>`)
    })
  $('#test').hide();
  $('.secondcolumn').html($film);

};