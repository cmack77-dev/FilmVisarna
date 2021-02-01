

//Hårdkodade variabler att byta ut
let chosenTheater = 'Salong 1';
let date = '2021-03-16';
let time = '21.00';
let movie = 'Gladiator';

//Externt funktionsanrop
bookSeats(chosenTheater, date, time, movie);

function bookSeats(chosenTheater, date, time, movie) {

  //Hämta JSON
  async function readJson() {
    let salonger = await $.getJSON('JSON-filer/salonger.json');
    console.log(salonger);

    showSeats(salonger);
  }
  readJson();

  //Rita upp platser grafiskt och tilldela varje plats ett id X?
  function showSeats(salonger) {
    let SeatNr;
    let rowCounter = 0;
    let $bookingWindow = $('<div class="obj"></div>');
    for (var i = 0; i < salonger.length; i++) {
      if (salonger[i].name === chosenTheater) {
        for (let nrOfSeats of salonger[i].seatsPerRow) {
          for (let x = 0; x < nrOfSeats; x++) {
            SeatNr = rowCounter + 1;
            $bookingWindow.append('<div class="seats" id="' + SeatNr + '"><span>' + "[  ]" + ' </span></div>');
            rowCounter++;
            if ((x + 1) === (nrOfSeats)) {
              $bookingWindow.append('<div></div>');
            }
          }
          $('.seatingBooking').append($bookingWindow);
        }
        //Resetknapp
        $('.seatingBooking').append('<button class="reset-button">Rensa valda stolar</button>');
        //Bokaknapp
        $('.seatingBooking').append('<button class="book-button">Gå vidare med valda stolar</button>');
        
        //Visa info om salong etc
        $('.film').append(movie);
        $('.salong').append(chosenTheater +', ('+SeatNr+' platser totalt)');
        $('.dateTime').append(date + ', kl ' + time);
        //Här ska det ändras till att räkna platser kvar!!!!!!!!!!!!!!!!!!!!!!
        $('.nrSeats').append(SeatNr);
        break;
      }
    }
  }


  //On click funktion som placerar vald plats i en array  
  let chosenSeats = [];
  $('body').on('click', '.seats', function () {
    seatID = '#' + ($(this).attr("id"));
    $(seatID).text('[x]');
    chosenSeats.push(seatID);
  });

  //Reset knapp som nollställer valda platser samt arrayen som lagrar dem
  $('body').on('click', '.reset-button', function () {
    for (seat of chosenSeats) {
      $(seat).text('[  ]');
    }
    chosenSeats = [];
  }); 

  //Boka knapp som nollställer valda platser samt arrayen som lagrar dem
  let bookedSeatsID = [];
  $('body').on('click', '.book-button', function () {
    bookedSeatsID = chosenSeats;
    for (seat of chosenSeats) {
      $(seat).text('[  ]');
    }
    chosenSeats = [];
    let seatNumbers = [];
    for (seat of bookedSeatsID) {
      
      seatNumbers.push(seat.substring(1, 5));
      seatNumbers.sort();
    }

    alert('Du har valt platser med nr: ' +seatNumbers+' till filmen: '+ movie + ' den ' + date + ' kl ' + time + ' i ' +chosenTheater+'.');
  }); 

}