let visningar = []
let title
let insertVar = ''
let BS = []
let salongerx
let bioRum

let enteredName
let enteredPhone
let enteredMail

let chosenTheater
let date
let time
let movie
let seatNumbers
let seatNr

let salonger = []
let chosenShowID
let nrOfTickets = 0
let totalSum = 0

$('.seatingBooking').hide()
$('.partTwoSecondColumn').hide()
$('.movieScreen').hide()

//Hämta och presentera tider för vald film
//Hämta JSON
async function getShows() {
  visningar = await $.getJSON('JSON-filer/visningar.json')
  title = storage.selectedMovie
  nrOfTickets =
    parseInt(storage.vuxna) +
    parseInt(storage.pensionar) +
    parseInt(storage.barn);

  let vuxenPris = storage.vuxna * 85;
  let pensionarPris = storage.pensionar * 75;
  let barnPris = storage.barn * 65;
  totalSum = vuxenPris + pensionarPris + barnPris;

  // $('.seatingBooking').hide()
  readInSeats()
  showSchedule()
}

async function showSchedule() {
  // $('.scheduleObj').html('')
  $('.seatingBooking').hide()

  $('.partTwoSecondColumn').show()
  $('.schedule').show()
  $('.schedule').html('')
  let movie = title
  let $scheduleWindow = ''

  $scheduleWindow = $(
    '<select class="scheduleObj"><option value="" disabled selected>Välj en föreställning</option></select>'
  )
  let counterVisningar = 0
  for (let visning of visningar) {
    //Här tilledelar vi varje visning ett unikt ID som vi kan använda oss av vid tex att läsa in rätt data till/från databas.
    let visningsID = counterVisningar++
    for (let key in visning) {
      if (visning[key] === movie) {
        let busySeats = 0

        async function readJson4(salong) {
          bioRum = salong
          salongerx = await $.getJSON('JSON-filer/salonger.json')
          await total(salongerx, bioRum)
        }
        readJson4(visning['biograf'])

        async function total(salongerx, bioRum) {
          for (salongx of salongerx) {
            if (salongx.name === bioRum) {
              totalSeats = salongx.seats
            }
          }

          for (let show of BS) {
            if (show.visningsid === visningsID) {
              busySeats++
            }
          }

          let SeatsLeft = totalSeats - busySeats

          $('.scheduleObj').append(
            '<option value="S' +
            visningsID +
            '"><span>' +
            visning['date'] +
            ', kl ' +
            visning['time'] +
            '<br><text>' +
            visning['biograf'] +
            ' - Platser kvar: ' +
            SeatsLeft +
            '</text></span></option>'
          )
        }
      }
    }
  }

  $('.schedule').append($scheduleWindow)

  $('.schemarubrik').empty()
  $('.schemarubrik').append('Visningar för ' + movie)

  $('body').on('change', '.scheduleObj', async function () {
    // console.log($(this))
    let x = $(this)
      .val()
      .substring(1, 4)

    movie = visningar[x].film
    chosenTheater = visningar[x].biograf
    date = visningar[x].date
    time = visningar[x].time
    $('.seatingBooking').show()
    $('.ticketType').hide()

    //Tilldela id för vald visning
    chosenShowID = x

    await bookSeats()
  })
}

async function bookSeats() {
  //Hämta JSON
  async function readJson3() {
    salonger = await $.getJSON('JSON-filer/salonger.json')
    await showSeats()
  }
  await readJson3()

  //Rita upp platser grafiskt
  async function showSeats() {
    let SeatNr
    let rowCounter = 0
    $('.obj').remove()
    let $bookingWindow = $('<div class="obj"></div>')
    let e = $bookingWindow
    for (let i = 0; i < salonger.length; i++) {
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
        $('.nrTickets').append('Vänligen välj ' + nrOfTickets + ' platser')
      }
    }
    //Läs in upptagna platser
    await readInAndDisableReservedSeats(chosenShowID, SeatNr)
  }

  //FUNKTION FÖR ATT LÄSA IN UPPTAGNA PLATSER
  async function readInAndDisableReservedSeats(chosenShowID, SeatNr) {
    let busySeats = 0
    let totalSeats = parseInt(SeatNr, 10)
    let arrOfAlreadyBookedSeats = []

    for (let show of BS) {
      if (show.visningsid == chosenShowID) {
        arrOfAlreadyBookedSeats.push(show.seatnr)
      }
    }

    for (let seatBusy of arrOfAlreadyBookedSeats) {
      busySeats++
      let seatID = '#' + seatBusy
      $(seatID).prop('disabled', true)
      $(seatID).css('background-color', 'blue')
    }

    //Räkna platser kvar
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
    seatNumbers = []
    for (seat of bookedSeatsID) {
      seatNumbers.push(seat.substring(1, 5))
      seatNumbers.sort()
    }

    // ----------------------- boknings-formulär --------------------------------

    $(
      '.secondcolumn'
    ).replaceWith(`<body><div class="secondcolumn"><div class="bookingField"><div class="bookingText"><h3 id="titleName">Bokning!</div><p>Nu är det dags att boka biljetter till filmen <b>${title}</b> <br><br>Avser föreställningen <b>${date}</b> kl <b>${time}</b> i <b>${chosenTheater}</b><br><br>Du har valt följande platser: <b>${seatNumbers}</b> <br><br>Totalsumma: <b>${totalSum}kr</b> <br><br></p>
      <div id="containerForm">
      <form class="booking-form" action="">
      <label for="namn">Fullständigt namn:</label>
      <input type="text" id="namn" name="namn" placeholder="namn" required> <br><br> 
      <label for="email">E-postadress:</label>
      <input type="email" id="email" name="email" placeholder="e-postadress" required> <br><br> 
      <label for="telefonnummer">Telefonnummer:</label>
      <input type="int" id="phone" name="phone" placeholder="telefonnummer" required></div></div><div align="center">
      </form>
      <button id="cancel-button" type="button">Avbryt reservation</button><button id="booking-button" type="button">Boka biljetter</button></div></div></body>`)

    $('.partTwoSecondColumn').hide()
    $('.firstcolumn').hide()
  })

  //FUNKTION SOM SKICKAR MED chosenseats...
  // Kod som implementeras vid tryck på "Boka biljetter knappen"
  $('body').on('click', '#booking-button', async () => {
    console.log('en gång')
    enteredName = $('#namn').val()
    enteredPhone = $('#phone').val()
    enteredMail = $('#email').val()
    $('.secondcolumn').replaceWith(
      `<div class="secondcolumn"><div class="booking-end"><h3 id="titleName">Tack för din bokning!</h3><p>Vi har skickat en bekräftelse till din email-adress.<br><br>Hjärtligt välkommen <b>${enteredName}</b> att se <b>${title}</b> den <b>${date}</b> klockan <b>${time}</b> i <b>${chosenTheater}</b>.<br><br>Vi önskar dig en riktigt trevlig bio upplevelse!</p> <button id="cancel-button" type="button">Tillbaka</button></div></div>`
    )

    let x = 0
    insertVar = ''
    seatNumbers.forEach(nr => {
      if (x === 0) {
        insertVar += `insert into bokningar values (${chosenShowID}, "${nr}", "${title}", "${chosenTheater}", "${enteredName}", "${enteredPhone}","${enteredMail}","${date}","${time}")`
      } else {
        insertVar += `,(${chosenShowID}, "${nr}", "${title}", "${chosenTheater}", "${enteredName}", "${enteredPhone}","${enteredMail}","${date}","${time}")`
      }
      x++
    })
    insertVar += ';'
    x = 0
    seatNumbers = []
    await book()
  })

  // Kod som implementeras vid tryck på "Avbryt reservation knappen"
  $('body').on('click', '#cancel-button', () => {
    //location.hash = '#booking'
    window.history.back()
  })
}

async function readInSeats() {
  BS = await db.run(/*sql*/ `select * from bokningar;`)
  // return BS
}

async function book() {
  console.log(insertVar)
  let result = await db.run(insertVar)
  console.table(result)
}
