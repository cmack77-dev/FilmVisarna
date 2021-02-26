async function getMovies () {
  return await $.getJSON('JSON-filer/filmer.json')
}
function toggleTrailer () {
  let trailer = $('.trailer-container')
  trailer.toggleClass('active')

  let video = $('#trailer').attr('src')
  $('#trailer').attr('src', '')
  $('#trailer').attr('src', video)
}

$('body').on('click', '#dropdown-vuxna', function () {
  storage.vuxna = $(this).val()
  // getShows()
})
$('body').on('click', '#dropdown-barn', function () {
  storage.barn = $(this).val()
  // getShows()
})
$('body').on('click', '#dropdown-pensionar', function () {
  storage.pensionar = $(this).val()
  // getShows()
})
