//temporära hårdkodade varaibler
let visningar = []
let title

let chosenTheater
let date
let time
let movie

let salonger = []
let chosenShowID
let nrOfTickets = 2
let JSONofBookedSeatsPerShow = [
  {
    visningsID: 2,
    seats: [5, 6, 22, 23, 42, 43, 69, 70]
  },
  {
    visningsID: 8,
    seats: [8, 9, 10, 44, 45, 67, 68]
  },
  {
    visningsID: 17,
    seats: [5, 6, 22, 23, 42, 43, 69, 70]
  },
  {
    visningsID: 22,
    seats: [33, 34, 78, 79, 80]
  },
  {
    visningsID: 26,
    seats: [12, 13, 18, 23, 24, 25, 67, 68, 71, 72]
  }
]

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
$('.seatingBooking').hide()
$('.partTwoSecondColumn').hide()
//$('.visning').hide()
$('.movieScreen').hide()

//Hämta och presentera tider för vald film
//Hämta JSON
async function getShows(nameOfFilm) {
  console.log('TESTAR!!!')

  visningar = await $.getJSON('JSON-filer/visningar.json')
  title = nameOfFilm
  console.log(title)
  $('.seatingBooking').hide()

  showSchedule()
}
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// function myFunction () {
//   document.getElementById('myDropdown').classList.toggle('show')
// }

// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function (event) {
//   if (!event.target.matches('.dropbtn')) {
//     let dropdowns = document.getElementsByClassName('dropdown-content')
//     let i
//     for (i = 0; i < dropdowns.length; i++) {
//       let openDropdown = dropdowns[i]
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show')
//       }
//     }
//   }
// }
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
function showSchedule() {
  $('.scheduleObj').html('')
  $('.partTwoSecondColumn').show()
  $('.schedule').show()
  $('.schedule').html('')
  let movie = title
  //$('.visning').remove()
  let $scheduleWindow = $('<select class="scheduleObj"><option value="" disabled selected>Välj en föreställning</option></select>')
  let counterVisningar = 0
  for (let visning of visningar) {
    //Här tilledelar vi varje visning ett unikt ID som vi kan använda oss av vid tex att läsa in rätt data till/från databas.
    let visningsID = counterVisningar++
    for (let key in visning) {
      if (visning[key] === movie) {
        let busySeats = 0

        async function readJson4(bioRum) {
          let salongerx = await $.getJSON('JSON-filer/salonger.json')
          total(salongerx, bioRum)
        }
        readJson4(visning['biograf'])

        function total(salongerx, bioRum) {
          for (salongx of salongerx) {
            if (salongx.name === bioRum) {
              totalSeats = salongx.seats
              console.log(totalSeats)
            }
          }

          for (let show of JSONofBookedSeatsPerShow) {
            if (show.visningsID === visningsID) {
              let arrOfAlreadyBookedSeatsID = show.seats
              busySeats = arrOfAlreadyBookedSeatsID.length
            }
          }

          let SeatsLeft = totalSeats - busySeats

          $('.scheduleObj').append(
            '<option value="S' +
            visningsID +
            '">' +
            visning['date'] +
            ', kl ' +
            visning['time'] +
            ' &nbsp &nbsp' +
            visning['biograf'] +
            ': ' +
            SeatsLeft +
            ' platser kvar</option>'
          )
          console.log(visningsID)
        }
      }
    }
  }
  // $('schedule').append('<option value="" disabled selected>Select your option</option>')
  $('.schedule').append($scheduleWindow)
  $('.schemarubrik').empty()
  $('.schemarubrik').append('Visningar för ' + movie)

  $('body').on('change', 'select', function () {
    console.log($(this))
    let x = $(this)
      .val()
      .substring(1, 4)

    movie = visningar[x].film
    chosenTheater = visningar[x].biograf
    date = visningar[x].date
    time = visningar[x].time

    $('.seatingBooking').show()

    //Tilldela id för vald visning
    chosenShowID = x

    bookSeats()
  })
}

function bookSeats() {
  //Hämta JSON
  async function readJson3() {
    salonger = await $.getJSON('JSON-filer/salonger.json')
    showSeats()
  }
  readJson3()

  //Rita upp platser grafiskt och tilldela varje plats ett id X?
  function showSeats() {
    let SeatNr
    let rowCounter = 0
    $('.obj').remove()
    let $bookingWindow = $('<div class="obj"></div>')
    let e = $bookingWindow
    for (var i = 0; i < salonger.length; i++) {
      if ($bookingWindow !== e) {
        $bookingWindow = e
      }
      if (salonger[i].name === chosenTheater) {
        for (let nrOfSeats of salonger[i].seatsPerRow) {
          for (let x = 0; x < nrOfSeats; x++) {
            SeatNr = rowCounter + 1
            $bookingWindow.append(
              '<a class ="a-hover"><div class="seats" id="' +
              SeatNr +
              '"><span>' +
              SeatNr +
              ' </span></div></a>'
            )
            rowCounter++
            if (x + 1 === nrOfSeats) {
              $bookingWindow.append('<div class="seatsrow"></div>')
            }
          }
          $('.seatingBooking').append($bookingWindow)
        }
        //Resetknapp
        $('.reset-button').remove()
        $('.seatingBooking').append(
          '<button class="reset-button">Rensa valda stolar</button>'
        )

        //Bokaknapp
        $('.book-button').remove()
        $('.seatingBooking').append(
          '<button class="book-button">Gå vidare med valda stolar</button>'
        )

        //Visa info om salong etc
        //Rensa först
        $('.film').empty()
        $('.salong').empty()
        $('.dateTime').empty()
        $('.nrSeats').empty()
        $('.film').append(movie)
        $('.salong').append(chosenTheater + ', (' + SeatNr + ' platser totalt)')
        $('.dateTime').append(date + ', kl ' + time)

        // break
      }
    }
    //Läs in upptagna platser
    readInAndDisableReservedSeats(chosenShowID, SeatNr)
  }

  //FUNKTION FÖR ATT LÄSA IN UPPTAGNA PLATSER
  function readInAndDisableReservedSeats(chosenShowID, SeatNr) {
    let busySeats = 0
    let totalSeats = parseInt(SeatNr, 10)
    for (let show of JSONofBookedSeatsPerShow) {
      //alert(show.visningsID+'?');

      if (show.visningsID.toString() === chosenShowID) {
        let arrOfAlreadyBookedSeatsID = show.seats
        for (let seatBusy of arrOfAlreadyBookedSeatsID) {
          busySeats++
          let seatID = '#' + seatBusy
          $(seatID).prop('disabled', true)
          $(seatID).css('background-color', 'blue')
        }
      }
    }
    //Här ska det ändras till att räkna platser kvar!!!!!!!!!!!!!!!!!!!!!!
    let SeatsLeft = totalSeats - busySeats
    $('.nrSeats').append('Platser kvar: ' + SeatsLeft)
  }

  //On click funktion som placerar vald plats i en array
  let chosenSeats = []
  $('body').on('click', '.seats', function () {
    let seatID = '#' + $(this).attr('id')
    if (jQuery.inArray(seatID, chosenSeats) === -1) {
      if (chosenSeats.length < nrOfTickets) {
        $(seatID).css('background-color', 'green')
        chosenSeats.push(seatID)
      } else {
        alert('Du kan bara välja ' + nrOfTickets + '!')
      }
    } else {
      $(seatID).css('background-color', 'red')
      chosenSeats.splice(chosenSeats.indexOf(seatID), 1)
    }
  })

  //Reset knapp som nollställer valda platser samt arrayen som lagrar dem
  $('body').on('click', '.reset-button', function () {
    for (seat of chosenSeats) {
      $(seat).css('background-color', 'red')
      let seatnr = seat.substring(1, 5)
      $(seat).text(seatnr)
    }
    chosenSeats = []
  })

  //Bokaknapp som nollställer valda platser samt arrayen som lagrar dem
  let bookedSeatsID = []
  $('body').on('click', '.book-button', function () {
    bookedSeatsID = chosenSeats
    for (seat of chosenSeats) {
      $(seat).css('background-color', 'red')
      let seatnr = seat.substring(1, 5)
      $(seat).text(seatnr)
    }
    chosenSeats = []
    let seatNumbers = []
    for (seat of bookedSeatsID) {
      seatNumbers.push(seat.substring(1, 5))
      seatNumbers.sort()
    }

    // ----------------------- Prototyp på ett boknings-formulär --------------------------------
    $(
      '.middleColumnChange'
    ).replaceWith(`<div><h3 id="titleName">Bokning!</div><p>Du har valt platser med nummer: ${seatNumbers} <br><br>Filmen du har valt är: ${title} <br><br>Den  ${date} kl ${time}<br><br></p>
      <div id="containerForm">
      <form action="">
      <label for="namn">Ange ditt namn:</label>
      <input type="text" id="namn" name="namn" placeholder="namn" required> <br><br> 
      <label for="email">Ange din e-postadress:</label>
      <input type="email" id="email" name="email" placeholder="e-postadress" required> <br><br> 
      <label for="telefonnummer">Ange ditt telefonnummer:</label>
      <input type="int" id="phone" name="phone" placeholder="telefonnummer" required></div>`)

    $('.moviecolumn').append(
      '<button id="cancel-button" type="button">Avbryt reservation</button>'
    )
    $('.moviecolumn').append(
      '<button id="booking-button" type="button">Boka biljetter</button>'
    )
    $('.partTwoSecondColumn').hide()
    $('.firstcolumn').hide()
  })

  // $('.secondcolumn').on('click', '#booking-button', function () {
  //   alert("FUNKAR!")
  //   }


  //FUNKTION SOM SKICKAR MED chosenseats...
  // Kod som implementeras vid tryck på "Boka biljetter knappen"
  $('body').on('click', '#booking-button', () => {
    $('.moviecolumn').replaceWith(`<div><h3 id="titleName">Tack för din bokning!</h3><p>Vi har skickat en bekräftelse till din email-adress. Hjärtligt välkommen, vi önskar dig en trevlig bio upplevelse!</p></div>`)
  })
  // Kod som implementeras vid tryck på "Avbryt reservation knappen"
  $('body').on('click', '#cancel-button', () => {
    window.history.back();
    // Denna knappen kommer inte fungera, vi måste lägga till hashlänkar eller eventListener till SPA. Så vi har en URL att gå bakåt till.
  })
}
