
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
    $('.ticket-dropdown').append()
  });
}
