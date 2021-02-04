

async function getSeats(seatPerRow) {
  let seats = await $.getJSON('JSON-filer/salonger.json');
  console.log(seats)
  renderSeats(seats)
}
$(document).ready(function () {
  $('#Välj').click(function () {

    var values = ["Normal", "Barn", "Pensionär",];

    $('#container')
      .append(
        $(document.createElement('label')).prop({
          for: 'Biljett'
        }).html('Välj antal vuxen biljetter: ')
      )
      .append(
        $(document.createElement('select')).prop({
          id: 'Biljetter',
          name: 'Biljetter'
        })
      )

    for (const val of values) {
      $('#Biljetter').append($(document.createElement('option')).prop({
        value: val,
        text: val.charAt(0).toUpperCase() + val.slice(1)
      }))
    }
  })
});
$('.thirdcolumn').append($())