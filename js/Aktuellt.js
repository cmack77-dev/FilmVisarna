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
        '<div><p class="movieClick" onclick="readJson(' + "'" + aktuella.title + "'" + '); "> <img src= "' + aktuella.images + '" id="moviePictureLink" </div>'
      )
    })
    $('.firstcolumn').html('')
  $('.firstcolumn').append($aktuella)
}
readJsonFilmer()
