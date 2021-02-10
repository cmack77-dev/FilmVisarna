async function readJsonFilmer(title) {
  let aktuellt = await $.getJSON('JSON-filer/filmer.json')
  //console.log(aktuellt);
  showJsonasHtml(aktuellt)
}
function showJsonasHtml(aktuellt) {
  let $aktuella = $('<div class="filmObj"></div>')
  aktuellt.filter(aktuella => aktuella.title)
    .forEach(aktuella => {
      $aktuella.append(
        '<div class="movieFrame"><p class="movieClick" onclick="readJson(' + "'" + aktuella.title + "'" + '); "> <img src= "' + aktuella.images + '" id="moviePictureLink"><button id="moviePictureButton">Hitta biljetter</button></p></div>'
      )
    })
    $('.firstcolumn').html('')
  $('.firstcolumn').append($aktuella)
}
readJsonFilmer()
