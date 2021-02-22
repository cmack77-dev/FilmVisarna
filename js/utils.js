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

  console.log(vuxna)
  alert(vuxna)
})
$('body').on('click', '#ticket-dropdown-barn', function () {
  barn = $(this).val()

})
$('body').on('click', '#ticket-dropdown-pensionar', function () {
  pensionar = $(this).val()


})