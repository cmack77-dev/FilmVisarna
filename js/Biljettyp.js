let jsonAntalTicket = [];

async function jsonticket() {
  jsonAntalTicket = await $getJSON('JSON-filer/ticketType.json')
  JsonTicketHtml(jsonAntalTicket);
}

function ticketLoad(jsonAntalTicket) {
  // tömmer main så bilder kan laddas in på nytt
  $('main').html('');

  let articles = tickets.map(jsonAntalTicket => `
    <article>
       <select id="ticket">
            <option value="">-- Select --'+' ${jsonAntalTicket.Antal}</option>
          </select>
      <h2>${photo.title}</h2>
    </article>
  `);

  articles.forEach(article => $('.ticket-dropdown').append(article));
}
/*

async function readJson() {
let Antalet = await $.getJSON('ticketType.json');
console.log(Antalet);
showJsonAsHtml(Antalet);
}

function ShowJsonTicket(Antalet) {
let $Antal = $('<div class="ticketTypeNormal"></div>')
Antalet.filter(Antal => Antal.Antal)
  .forEach(Antal => {
    $Antal.append('<select id="sel">"select"< option value = "">' + "'" + Antal.Antal + "'" + ' </option ></select > ');
  });
$('.ticketTypeNormal').html('');
$('ticketTypeNormal').append($Antal)
}
ShowJsonTicket()
/*
// Show the persons and their properties as html
function showJsonAsHtml(Antalet) {
// A for...of loop loops through an array
// tip: Name you arrays in plural (persons)
// and your loop variable same name but in singular (person)
for (let Antal of Antalet) {
  // Create a div as an jquery object
  let $Antal = $('<div class="ticketTypeNormal"></div>');
  // A for...in loop loops through the properties/keys
  // of an object
  for (let key in Antal) {
    let value = Antalet[key];
    if (key === 'Antal') //{ value = value.join(', '); }
      $Antal.append('<select id="sel">"select"< option value = "">' + "'" + Antalet.Key + "'" + ' </option ></select > ');


    console.log(Antal)
  }

  $('.ticketTypeNormal').append($Antal);
}
}

// Start the program
readJson();*/


/*
async function dropdown(dropdown) {
  let dropdown = $('#ticket-dropdown');
  dropdown.empty();
  dropdown.append('<option selected="true" disabled>Välj antal bijetter</option>');
  dropdown.prop('selectedIndex', 0);
  let ticketType = await $.getJSON('JSON-filer/ticketType.json')
  let dropdown = $('#ticket-dropdown');
  dropdown.empty();
  dropdown.append('<option selected="true" disabled>Välj antal bijetter</option>');
  dropdown.prop('selectedIndex', 0);


  $.getJSON(ticketType, function (data) {
    $.each(data, function (entry) {
      dropdown.append($('<option></option>').attr('value', entry.Antal).text(entry.TicketType));
    })
    $('#ticket-dropdown').append(dropdown(tickets))
    console.log(dropdown())
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/*
async function readJsonFilmer() {
  $('.ticketTypeNormal').html('')
  $('.ticketTypeNormal').show()
  let type = await $.getJSON('JSON-filer/ticketType.json')

  showJsonasHtml(type)
}
function showJsonasHtml(type) {
  let $type = $('<div class="ticketTypeNormal"></div>')
  type.filter(types => types.Antal)
    .forEach(type => {
      $types.append(
        '<div> <select id="ticket-dropdown" name="tickets">' + "'" + types.Antal + "'" '</select ></div >')

    })
  $('.ticketTypeNormal').html('')
  $('.ticketTypeNormal').append($types)
}
readJsonFilmer()
*/