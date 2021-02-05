

async function readJsonFilmer(title) {
  let aktuellt = await $.getJSON('JSON-filer/filmer.json');
  console.log(aktuellt);
  showJsonasHtml(aktuellt);
}
function showJsonasHtml(aktuellt) {
  for (let aktuella of aktuellt) {
    let $aktuella = $('<div class="filmObj"></div>');
    for (let i in aktuella) {
      let value = aktuella[i];
      if (i === 'title')
        $aktuella.append('<div><p class="movieClick" onclick="readJson(' + "'" + value + "'" + '); "> ' + value + '</div>');
    }
    $('.firstcolumn').append($aktuella);
  }
}
readJsonFilmer();
