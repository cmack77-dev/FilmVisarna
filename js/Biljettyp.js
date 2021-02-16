
function readNumbers() {

  $('.ticketTypeNormal').prepend('<H4>Välj antal biljetter<br></H4>')
  $('#ticket-dropdown-vuxna').append('<option value="" disabled selected>Vuxna</option>')
  $('#ticket-dropdown-barn').append('<option value="" disabled selected>Barn</option>')
  $('#ticket-dropdown-pensionar').append('<option value="" disabled selected>Pensionär</option>')
  console.log(readNumbers)

  for (let antal = 1; antal < 25; antal++) {

    $('#ticket-dropdown-vuxna').append(`<option value="antal"> ${antal} </option>`)
    $('#ticket-dropdown-barn').append(`<option value="antal"> ${antal} </option>`)
    $('#ticket-dropdown-pensionar').append(`<option value="antal"> ${antal} </option>`)
    console.log(readNumbers)


  }


  $('body').on('select', 'antal', function () {
    console.log($(this))
    let vuxna = $(this)
      .val(vuxna)
  })
}
