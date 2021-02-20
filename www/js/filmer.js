let vuxna;
let barn;
let pensionar;

async function readJson(title) {
  let filmer = await $.getJSON('JSON-filer/filmer.json')
  showJsonAsHtml(filmer, title)
  // readNumbers()

  getShows(title) //Markus har lagt in för att ropa på funktioner för bokning etc.
}

function showJsonAsHtml(filmer, wantedTitle) {
  let $film = $('<div class="moviecolumn"></div>')

  filmer
    .filter(film => film.title === wantedTitle)
    .forEach(film => {
      $film.append(
        `<section class="middleColumnChange"><div id="movieText"> <h3 id="titleName">${film.title}</h3> <p>Handling: ${film.description}</p> <p>Regissör: ${film.director}</p> <p>Skådespelare: ${film.actors}</p> </div> <div id="moviePicture"><img src="${film.images}" id="moviePic"></div> <div> <iframe id="trailer" src="${film.youtubeTrailers}" allowfullscreen></iframe> </div></section>`
      )

      $('.moviecolumn').replaceWith($film)
      $('.middleColumnChange').append(`<form>
<div class="ticketTypeNormal"></div>
 <select id="ticket-dropdown-vuxna" name="tickets"></select>  
 <select id="ticket-dropdown-barn" name="tickets"></select>
<select id="ticket-dropdown-pensionar" name="tickets"></select>

</form>`)
      $('.ticketTypeNormal').append('<H4>Välj antal biljetter<br></H4>')
      $('#ticket-dropdown-vuxna').append('<option value="" disabled selected>Vuxna</option>')
      $('#ticket-dropdown-barn').append('<option value="" disabled selected>Barn</option>')
      $('#ticket-dropdown-pensionar').append('<option value="" disabled selected>Pensionär</option>')
      // console.log(readNumbers)

      for (let antal = 1; antal < 25; antal++) {

        $('#ticket-dropdown-vuxna').append(`<option value="${antal}"> ${antal} </option>`)
        $('#ticket-dropdown-barn').append(`<option value="${antal}"> ${antal} </option>`)
        $('#ticket-dropdown-pensionar').append(`<option value="${antal}"> ${antal} </option>`)
        // console.log(readNumbers)
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
      // $('.secondcolumn').html($film);
    })

  // function readNumbers() {

  //   console.log('test')

  // }

}
