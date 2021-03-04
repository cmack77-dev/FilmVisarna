let realname;
let email;
let uname;
let pwd;
let cpwd;


function registration() {

  realname = $('#t1').val();
  email = $('#t2').val();
  uname = $('#t3').val();
  pwd = $('#t4').val();
  cpwd = $('#t5').val();



  console.log(realname)
  console.log(email)
  console.log(uname)
  console.log(pwd)
  console.log(cpwd)


  // val av Special tecken för PW kan läggas till senare| (?=.*?[#?!@$%^&*-]) | 
  let pwd_expression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/;
  let letters = /^[A-Za-z \båäö]+$/;
  let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  //if stats för att vägleda användare att skriva in rätt i formulär
  if (realname == '') {
    $('#t1').after('<p class="formmsg">Vänligen skriv ditt Namn*</p>');
  }
  else if (!letters.test(realname)) {
    $('#t1').after('<p class="formmsg">endast vanliga tecken i Namn*</p>');
  }
  else if (email == '') {
    $('#t2').after('<p class="formmsg">skriv en E-post*</p>');
  }
  else if (!filter.test(email)) {
    $('#t2').after('<p class="formmsg">Ogiltig E-post*</p>');
  }
  else if (uname == '') {
    $('#t3').after('<p class="formmsg">Ange Användarnamn*</p>');
  }
  else if (!letters.test(uname)) {
    $('.formmsg').replaceWith('')
    $('#t3').after('<p class="formmsg">Användarnamn får endast innehålla vanliga tecken*</p>');
  }
  else if (pwd == '') {
    $('#t4').after('<p class="Vänligen skriv ett lösenord*</p>');
  }
  else if (cpwd == '') {
    $('#t5').after('<p class="formmsg">Bekräfta lösenord*</p>');
  }
  else if (!pwd_expression.test(pwd)) {
    $('#5').after('<p class="formmsg">Lösenord måste innehålla små och stora bokstäver och minst 1 siffra*</p>');

  }
  else if (pwd != cpwd) {
    $('#t5').after('<p class="formmsg">Lösenord matchar inte, var god försök igen!*</p>');
  }
  else if ($('#t5').val().length < 6) {
    $('#t1').after('<p class="formmsg">Minst 6 tecken i lösenordet</p>');
  }

  else {
    alert('Tack för din registrering!');

    window.location = "#start";
  }
}

//Reset knapp för att rensa förmulär
function clearFunc() {
  $('#t1').val('');
  $('#t2').val('');
  $('#t3').val('');
  $('#t4').val('');
  $('#t5').val('');

}
function createAcount() {
  $('#submit').trigger('click'), function () {
    formID = $(this).value
  }

}



