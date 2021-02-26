let formID
async function getMovies() {
  return await $.getJSON('JSON-filer/filmer.json')

}
function toggleTrailer() {
  let trailer = $('.trailer-container')
  trailer.toggleClass('active')

  let video = $('#trailer').attr('src');
  $('#trailer').attr('src', "");
  $('#trailer').attr('src', video);
}

$('body').on('click', '#dropdown-vuxna', e => {
  vuxna = $(e.currentTarget).val()

})
$('body').on('click', '#dropdown-barn', function () {
  barn = $(this).val()

})
$('body').on('click', '#dropdown-pensionar', function () {
  pensionar = $(this).val()


})
$('#loginForm').on('click', '#btn', function () {
  formID = $(this).val()
  console.log(formID)
  console.log('formID')
})
