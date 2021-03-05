async function getMovies() {
  return await $.getJSON('JSON-filer/filmer.json')
}
function toggleTrailer() {
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
$('body').on('click', '#movie-list', function () {
  storage.selectedMovie = $(this).val()
})
$('#loginForm').on('click', '#btn', function () {
  formID = $(this).val()
  console.log(formID)
  console.log('formID')
})
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 8 + 0.2}s`
      }
    });
    burger.classList.toggle('toggle')
  });

}
navSlide();
