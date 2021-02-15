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
