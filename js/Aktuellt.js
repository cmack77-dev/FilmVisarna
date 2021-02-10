async function readJsonFilmer(title) {
  let aktuellt = await $.getJSON('JSON-filer/filmer.json')
  //console.log(aktuellt);
  showJsonasHtml(aktuellt)
}
function showJsonasHtml(aktuellt) {
  let $aktuella = $('<div class="filmObj"><h2>Aktuella Filmer</h2></div>')
  aktuellt.filter(aktuella => aktuella.title)
    .forEach(aktuella => {
      $aktuella.append(
        '<div class="movieFrame"><img onclick="readJson(' + "'" + aktuella.title + "'" + ');" src= "' + aktuella.images + '" id="moviePictureLink"><button id="moviePictureButton">Hitta biljetter</button></div>'
      )
    })
  $('.secondcolumn').append($aktuella)
}
readJsonFilmer()
