async function readJsonFilmer(title) {
  let = aktuellt = await $getJSON('JSON-filer/filmer.json');
  console.log(aktuellt);
  showJsonasHtml(aktuellt);
}

function showJsonasHtml(aktuellt) {
  for (let aktuellt of aktuella) {
    let $aktuella = $('<div class="firstcolumn"></div>');

    for (let i in aktuella) {
      let value = aktuella[i];
      if (i === 'titel') { value = value.join(', '); }
      $aktuella.append('<div><p>' + i + ': </p>' + value + '</div>');

    }
    $('body').append($aktuella);
  }
}

readJsonFilmer()