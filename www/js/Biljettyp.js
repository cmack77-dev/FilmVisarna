let vuxna;
let barn;
let pensionar;
function readNumbers() {
  $('.middleColumnChange').append(`<form>
<div class="ticketTypeNormal"></div>
 <select id="ticket-dropdown-vuxna" name="tickets"></select>  <select id="ticket-dropdown-barn" name="tickets"></select>
<select id="ticket-dropdown-pensionar" name="tickets"></select>

</form>`)

  $('.ticketTypeNormal').append('<H4>Välj antal biljetter<br></H4>')
  $('#ticket-dropdown-vuxna').append('<option value="" disabled selected>Vuxna</option>')
  $('#ticket-dropdown-barn').append('<option value="" disabled selected>Barn</option>')
  $('#ticket-dropdown-pensionar').append('<option value="" disabled selected>Pensionär</option>')
  console.log(readNumbers)

  for (let antal = 1; antal < 25; antal++) {

    $('#ticket-dropdown-vuxna').append(`<option value="${antal}"> ${antal} </option>`)
    $('#ticket-dropdown-barn').append(`<option value="${antal}"> ${antal} </option>`)
    $('#ticket-dropdown-pensionar').append(`<option value="${antal}"> ${antal} </option>`)
    console.log(readNumbers)
  }

  $('body').on('click', '#ticket-dropdown-vuxna', () => {
    vuxna = $(this)
      .val()
  })
  $('body').on('click', '#ticket-dropdown-barn', () => {
    barn = $(this)
      .val()
  })
  $('body').on('click', '#ticket-dropdown-pensionar', () => {
    pensionar = $(this)
      .val()

  })
}
