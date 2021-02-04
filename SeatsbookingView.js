
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}







//temporära hårdkodade varaibler
let nrOfTickets = 2;
let JSONofBookedSeatsPerShow = [
  {
    "visningsID": 2,
    "seats": [5, 6, 22, 23, 42, 43, 69, 70]
  },
  {
    "visningsID": 8,
    "seats": [8, 9, 10, 44, 45, 67, 68]
  },
  {
    "visningsID": 17,
    "seats": [5, 6, 22, 23, 42, 43, 69, 70]
  },
  {
    "visningsID": 22,
    "seats": [33, 34, 78, 79, 80]
  },
  {
    "visningsID": 26,
    "seats": [12, 13, , 23, 24, 25, 67, 68, 71, 72]
  }
];

let chosenShowID;

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
$('.seatingBooking').hide();
$('.thirdcolumn').hide();
$('.visning').hide();
$('.movieScreen').hide();

  //Hämta och presentera tider för vald film
  //Hämta JSON
  async function readJson2(title) {
    let visningar = await $.getJSON('JSON-filer/visningar.json');
   
    $('.seatingBooking').hide();
    showSchedule(visningar,title);
  }

function showSchedule(visningar, title) {
  $('.thirdcolumn').show();
  $('.schedule').show();
  let movie = title;
  $('.visning').remove();
  let $scheduleWindow = $('<div class="scheduleObj"></div>');
  let counterVisningar = 0;
  for (let visning of visningar) {
    //Här tilledelar vi varje visning ett unikt ID som vi kan använda oss av vid tex att läsa in rätt data till/från databas.
    let visningsID = ((counterVisningar++));
    for (let key in visning) {
      if (visning[key] === movie) {
        console.log('film hittad!');
        $('#myDropdown').append('<a><div class="visning" id="S' + visningsID + '"><span>' + visning['date'] + ', kl ' + visning['time'] + ' - ' + visning['biograf'] + '</span></div></a>');
      }
    }
  }

  $('.schedule').append($scheduleWindow);
  $('.schemarubrik').empty();
    $('.schemarubrik').append('Visningar för '+ movie);
  
  
  $('body').on('click', '.visning', function () {
   // $('.hook').remove();

    let x = ($(this).attr("id")).substring(1, 4);
    //alert(x);
    // $(this).text(x);
    // $('.visning span').css('background-color', 'green');
    // $(this).append('<div class="hook"><span><=</span></div>');
      
        movie = visningar[x].film;
        chosenTheater = visningar[x].biograf;
        date = visningar[x].date;
        time = visningar[x].time;
      
    $('.seatingBooking').show();
    
    //Tilldela id för vald visning
    chosenShowID = x;
     
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
    let e = $bookingWindow;
    for (var i = 0; i < salonger.length; i++) {
      if ($bookingWindow !== e) { $bookingWindow = e;}
      if (salonger[i].name === chosenTheater) {
        for (let nrOfSeats of salonger[i].seatsPerRow) {
          for (let x = 0; x < nrOfSeats; x++) {
            SeatNr = rowCounter + 1;
            $bookingWindow.append('<div class="seats" id="' + SeatNr + '"><span>' + SeatNr+ ' </span></div>');
            rowCounter++;
            if ((x + 1) === (nrOfSeats)) {
              $bookingWindow.append('<div class="seatsrow"></div>');
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
        //Rensa först
        $('.film').empty();
        $('.salong').empty();
        $('.dateTime').empty();
        $('.nrSeats').empty();
        $('.film').append(movie);
        $('.salong').append(chosenTheater + ', (' + SeatNr + ' platser totalt)');
        $('.dateTime').append(date + ', kl ' + time);
        
        break;
      }
    }
    //Läs in upptagna platser
    readInAndDisableReservedSeats(chosenShowID,SeatNr);
  }

  //FUNKTION FÖR ATT LÄSA IN UPPTAGNA PLATSER
  function readInAndDisableReservedSeats(chosenShowID,SeatNr) {
let busySeats = 0;
      let totalSeats = parseInt(SeatNr, 10);
    for (let show of JSONofBookedSeatsPerShow) {
      //alert(show.visningsID+'?');
      
      if (show.visningsID.toString() === chosenShowID) {
        let arrOfAlreadyBookedSeatsID = show.seats;
        for (let seatBusy of arrOfAlreadyBookedSeatsID) {
          busySeats++;
          let seatID = '#' + seatBusy;
      $(seatID).prop("disabled", true);
      $(seatID).css('background-color', 'blue');
        }
      }       
    }  
    //Här ska det ändras till att räkna platser kvar!!!!!!!!!!!!!!!!!!!!!!
    let SeatsLeft = totalSeats-busySeats;
        $('.nrSeats').append('Platser kvar: ' +SeatsLeft);
 }

  //On click funktion som placerar vald plats i en array  
  let chosenSeats = [];
  $('body').on('click', '.seats', function () {
    
    let seatID = '#' + ($(this).attr("id"));
    if (jQuery.inArray(seatID, chosenSeats) === -1) {
      if (chosenSeats.length < (nrOfTickets)){
      $(seatID).css('background-color', 'green');
        chosenSeats.push(seatID);
         }
  else {
    alert("Du kan bara välja " + nrOfTickets + "!");
  }
    }
    else {
      $(seatID).css('background-color', 'red');
      
      chosenSeats.splice(chosenSeats.indexOf(seatID), 1);
     
    }
 

  });

  //Reset knapp som nollställer valda platser samt arrayen som lagrar dem
  $('body').on('click', '.reset-button', function () {
    for (seat of chosenSeats) {
      $(seat).css('background-color', 'red');
      let seatnr = seat.substring(1, 5);
      $(seat).text(seatnr);
    }
    chosenSeats = [];
  }); 

  //Bokaknapp som nollställer valda platser samt arrayen som lagrar dem
  let bookedSeatsID = [];
  $('body').on('click', '.book-button', function () {
    bookedSeatsID = chosenSeats;
    for (seat of chosenSeats) {
      $(seat).css('background-color', 'red');
      let seatnr = seat.substring(1, 5);
      $(seat).text(seatnr);
    }
    chosenSeats = [];
    let seatNumbers = [];
    for (seat of bookedSeatsID) {
      
      seatNumbers.push(seat.substring(1, 5));
      seatNumbers.sort();
    }
    
    alert('Du har valt platser med nr: ' + seatNumbers + ' till filmen: ' + movie + ' den ' + date + ' kl ' + time + ' i ' + chosenTheater + '.');
  
  }); 
  //FUNKTION SOM SKICKAR MED chosenseats...
}