// Function som kallar på array av valda plater för att kunna välja biljet typ

//import { chosenSeats, seatID } from './SeatsbookingView';

/*function ticketType(showSeats) {
  showSeats(seatId);
  return seatId;
  console.log(showSeats);
}*/
/*
window.onload = function () {
  var subjectSel = document.getElementById("Normal");
  var topicSel = document.getElementById("Barn");
  var chapterSel = document.getElementById("Pensionär");
  for (var x in subjectObject) {
    subjectSel.options[subjectSel.options.length] = new Option(x, x);
  }
  subjectSel.onchange = function () {
    //empty Chapters- and Topics- dropdowns
    chapterSel.length = 1;
    topicSel.length = 1;
    //display correct values
    for (var y in subjectObject[this.value]) {
      topicSel.options[topicSel.options.length] = new Option(y, y);
    }
  }
  topicSel.onchange = function () {
    //empty Chapters dropdown
    chapterSel.length = 1;
    //display correct values
    var z = subjectObject[subjectSel.value][this.value];
    for (var i = 0; i < z.length; i++) {
      chapterSel.options[chapterSel.options.length] = new Option(z[i], z[i]);
    }
  }
}
$('thirdcolumn').append()
<h1 style="color: rgb(73, 76, 112)">
            Välj Din Biljetttyp
          </h1>



          <p>
            Välj Antal Normal Biljetter:
            <select id="select1">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </p>

          <p>
            Antal:
            <span class="output"></span>
          </p>


          <p>
            Välj Antal Barn Biljetter:
            <select id="select2">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </p>
          <script type="text/javascript">s
            function getOption() {
              selectElement = document.querySelector('#select2');

              output =
                selectElement.options[selectElement.selectedIndex].value;

              document.querySelector('.output').textContent = output;
            }
          </script>

          <p>
            antal:
            <span class="output"></span>
          </p>

          <p>
            Välj Antal Pensionär Biljetter:
            <select id="select3">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </p>

          <p>
            The value of the option selected is:
            <span class="output"></span>
          </p>

          <button onclick="getOption()">
            Check option
          </button>

          <script type="text/javascript">s
            function getOption() {
              selectElement = document.querySelector('#select1');

              output =
                selectElement.options[selectElement.selectedIndex].value;

              document.querySelector('.output').textContent = output;
            }
          </script>


*/



/* function showJsonasHtml(aktuellt) {
  for (let aktuella of aktuellt) {
    let $aktuella = $('<div class="filmObj"></div>')
    for (let i in aktuella) {
      let value = aktuella[i]
      if (i === 'title')
        $aktuella.append(
          '<div><p class="movieClick" onclick="readJson(' +
          "'" +
          value +
          "'" +
          '); "> ' +
          value +
          '</div>'
        )*/







/*
for (let ticketType of ticketTypes) {
let $ticketType = $('<select class="ticketTypeNormal"><option value="" disabled selected>Antal Normal Biljetter</option></select>')
}
for (let i in ticketType) {
let value = ticketType[i]
if (i === 'Antal')
$ticketType.append(
' <select name="" id=""><option value="">' +
"'" +
value +
"'" +
'); "> ' +
value +
'</option>'
)
}
ticketTypes.filter(ticketType => ticketType.TicketType)
.forEach(ticketType => {
$ticketType.append(
'<div><select class="" onclick="readJson(' + "'" + ticketType.TicketType + "'" + '); "></div>'
)
})
$('.ticketTypeNormal').append($ticketType)
}
readJsonTicketType()
*/








// @import url(SeatsbookingView.js);

// fucktion ticketType(){
//   showSeats(showSeats);
//   console.log(showSeats);
// }

/*function tickettype() {
  let $ticketTypeNormal = $(`<select class="ticketTypeNormal"><option value="" disabled selected>Välj antal normal biljetter</option></select>')
  '<select class="ticketTypeKid"><option value="" disabled selected>Välj antal barn biljetter </option></select>')
  '<select class="ticketTypePensioner "><option value="" disabled selected>Välj en föreställning</option></select>')`);

  $('.ticketTypeNprmal').append(ticketTyperNormal)*/



/* let dropdown = $('#locality-dropdown');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose State/Province</option>');
dropdown.prop('selectedIndex', 0);

const url = 'https://api.myjson.com/bins/7xq2x';

// Populate dropdown with list of provinces
$.getJSON(url, function (data) {
$.each(data, function (key, entry) {
  dropdown.append($('<option></option>').attr('value', entry.abbreviation).text(entry.name));
})
});*/