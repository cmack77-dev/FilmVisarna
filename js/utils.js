async function getMovies() {
  return await $.getJSON('JSON-filer/filmer.json')

}
function toggleTrailer() {
  let trailer = document.querySelector('.trailer-container')
  trailer.classList.toggle('active')

  let video = $('#trailer').attr('src');
  $('#trailer').attr('src', "");
  $('#trailer').attr('src', video);
}