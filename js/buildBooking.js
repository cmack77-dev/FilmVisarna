  // ----------------------- Prototyp på ett boknings-formulär --------------------------------
   function buildBooking(seatNumbers,title,date,time){
  //alert('test')
//   $('.first').append(`<div><h3 id="titleName">Bokning!</div>`)
//let html = `${await $.get('html-partials/booking.html')}`;
let html = `<div><h3 id="titleName">Bokning!</div><p>Du har valt platser med nummer: ${seatNumbers} <br><br>Filmen du har valt är: ${title} <br><br>Den  ${date} kl ${time}<br><br></p>
<div id="containerForm">
<form action="">
<label for="namn">Ange ditt namn:</label>
<input type="text" id="namn" name="namn" placeholder="namn" required> <br><br> 
<label for="email">Ange din e-postadress:</label>
<input type="email" id="email" name="email" placeholder="e-postadress" required> <br><br> 
<label for="telefonnummer">Ange ditt telefonnummer:</label>
<input type="int" id="phone" name="phone" placeholder="telefonnummer" required></div><div class="knapp"></div>`
$('main').prepend(html);

//   $('main').append(`<div><h3 id="titleName">Bokning!</div><p>Du har valt platser med nummer: ${seatNumbers} <br><br>Filmen du har valt är: ${title} <br><br>Den  ${date} kl ${time}<br><br></p>
//     <div id="containerForm">
//     <form action="">
//     <label for="namn">Ange ditt namn:</label>
//     <input type="text" id="namn" name="namn" placeholder="namn" required> <br><br> 
//     <label for="email">Ange din e-postadress:</label>
//     <input type="email" id="email" name="email" placeholder="e-postadress" required> <br><br> 
//     <label for="telefonnummer">Ange ditt telefonnummer:</label>
//     <input type="int" id="phone" name="phone" placeholder="telefonnummer" required></div>`)
let button1 = '<button id="cancel-button" type="button">Avbryt reservation</button>'
let button2 = '<button id="booking-button" type="button">Boka biljetter</button>'
  $('.knapp').append(button1)
  $('.knapp').append(button2)
  }

  

//FUNKTION SOM SKICKAR MED chosenseats...
// Kod som implementeras vid tryck på "Boka biljetter knappen"
$('main').on('click', '#booking-button', () => {
  $('main').replaceWith(`<div><h3 id="titleName">Tack för din bokning!</h3><p>Vi har skickat en bekräftelse till din email-adress. Hjärtligt välkommen, vi önskar dig en trevlig bio upplevelse!</p></div>`)
})
// Kod som implementeras vid tryck på "Avbryt reservation knappen"
$('body').on('click', '#cancel-button', () => {
   
  window.history.back();
  // Denna knappen kommer inte fungera, vi måste lägga till hashlänkar eller eventListener till SPA. Så vi har en URL att gå bakåt till.
}
)

buildBooking(seatNumbers,title,date,time)
