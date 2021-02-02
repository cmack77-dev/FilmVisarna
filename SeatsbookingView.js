//"title": "Gladiator",
                                                         //<p class="movieClick" onclick="readJson('Gladiator');">Gladiator</p> 

// async function readJsonX() {
//     let filmer = await $.getJSON('JSON-filer/filmer.json');
   
//    listMovies(filmer);
//   }

// readJsonX()

// function listMovies(filmer) {
//   let $listOfMovies = $('<div class="filmObj"></div>');
  
//  for (var i = 0; i < filmer.length; i++) {
    
//     $listOfMovies.append('<div class="filmLista"><p class="movieClick" id="x'+i+'" onclick="readJson('+ "'"+filmer[i].title +"'"+');">'+ filmer[i].title +'</p></div>');
//   }
//   $('.firstcolumn').append($listOfMovies);
// }


$('.seatingBooking').hide();

  //Hämta och presentera tider för vald film
  //Hämta JSON
  async function readJson2(title) {
    let visningar = await $.getJSON('JSON-filer/visningar.json');
    showSchedule(visningar,title);
  }

function showSchedule(visningar, title) {
  let movie = title;
  $('.visning').remove();
  let $scheduleWindow = $('<div class="scheduleObj"></div>');
  for (var i = 0; i < visningar.length; i++) {
    if (visningar[i].film === movie) {
      $scheduleWindow.append('<div class="visning" id="S' + i + '"><span>' + visningar[i].date + ', kl ' + visningar[i].time.toFixed(2) +' - ' + visningar[i].biograf +'</span></div>');
    }
  }
  $('.schedule').append($scheduleWindow);
  $('.schemarubrik').empty();
    $('.schemarubrik').append('Visningar för '+ movie);
  
  
  $('body').on('click', '.visning', function () {
    $('.hook').remove();
    $('.film').empty();
    $('.salong').empty();
    $('.dateTime').empty();
    $('.nrSeats').empty();

    
    let x =($(this).attr("id")).substring(1,4);
    // $(this).text(x);
    // $('.visning span').css('background-color', 'green');
     $(this).append('<div class="hook"><span><=</span></div>');
      
        movie = visningar[x].film;
        chosenTheater = visningar[x].biograf;
        date = visningar[x].date;
        time = visningar[x].time;
      
      $('.seatingBooking').show();
     
bookSeats(chosenTheater, date, time, movie);

  }); 
}


function bookSeats(chosenTheater, date, time, movie) {

  //Hämta JSON
  async function readJson3() {
    let salonger = await $.getJSON('JSON-filer/salonger.json');
    showSeats(salonger);
  }
  readJson3();

  //Rita upp platser grafiskt och tilldela varje plats ett id X?
  function showSeats(salonger) {
    let SeatNr;
    let rowCounter = 0;
    $('.obj').remove();
    let $bookingWindow = $('<div class="obj"></div>');
    for (var i = 0; i < salonger.length; i++) {
      if (salonger[i].name === chosenTheater) {
        for (let nrOfSeats of salonger[i].seatsPerRow) {
          for (let x = 0; x < nrOfSeats; x++) {
            SeatNr = rowCounter + 1;
            $bookingWindow.append('<div class="seats" id="' + SeatNr + '"><span>' + "["+SeatNr+"]" + ' </span></div>');
            rowCounter++;
            if ((x + 1) === (nrOfSeats)) {
              $bookingWindow.append('<div></div>');
            }
          }
          $('.seatingBooking').append($bookingWindow);
        }
        //Resetknapp
        $('.reset-button').remove();
        $('.seatingBooking').append('<button class="reset-button">Rensa valda stolar</button>');
        
        //Bokaknapp
        $('.book-button').remove();
        $('.seatingBooking').append('<button class="book-button">Gå vidare med valda stolar</button>');
        
        //Visa info om salong etc
        $('.film').append(movie);
        $('.salong').append(chosenTheater + ', (' + SeatNr + ' platser totalt)');
        $('.dateTime').append(date + ', kl ' + time.toFixed(2));
        //Här ska det ändras till att räkna platser kvar!!!!!!!!!!!!!!!!!!!!!!
        $('.nrSeats').append('Platser kvar: ' +SeatNr);
        break;
      }
    }
  }

  //On click funktion som placerar vald plats i en array  
  let chosenSeats = [];
  $('body').on('click', '.seats', function () {
    let seatID = '#' + ($(this).attr("id"));
    if (jQuery.inArray(seatID, chosenSeats) === -1) {
      $(seatID).css('background-color', 'green');
      chosenSeats.push(seatID);
    }
    else {
      $(seatID).css('background-color', 'red');
      
      chosenSeats.splice(chosenSeats.indexOf(seatID), 1);
     
    }
    //$('.summaryTickets').append('<div><p>'+seatID+'</p></div>');

  });

  //Reset knapp som nollställer valda platser samt arrayen som lagrar dem
  $('body').on('click', '.reset-button', function () {
    for (seat of chosenSeats) {
      $(seat).css('background-color', 'red');
      let seatnr = seat.substring(1, 5);
      $(seat).text('['+seatnr+']');
      
    }
    chosenSeats = [];
  }); 

  //Boka knapp som nollställer valda platser samt arrayen som lagrar dem
  let bookedSeatsID = [];
  $('body').on('click', '.book-button', function () {
    bookedSeatsID = chosenSeats;
     for (seat of chosenSeats) {
      $(seat).css('background-color', 'red');
      let seatnr = seat.substring(1, 5);
      $(seat).text('['+seatnr+']');
      
    }
    chosenSeats = [];
    let seatNumbers = [];
    for (seat of bookedSeatsID) {
      
      seatNumbers.push(seat.substring(1, 5));
      seatNumbers.sort();
    }
    
    alert('Du har valt platser med nr: ' +seatNumbers+' till filmen: '+ movie + ' den ' + date + ' kl ' + time.toFixed(2) + ' i ' +chosenTheater+'.');
  }); 

}