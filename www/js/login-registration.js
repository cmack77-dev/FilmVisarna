let realname;
let email;
let uname;
let pwd;
let cpwd;




function registration() {

  username = $('t1').val();
  email = $('t2').val();
  uname = $('t3').val();
  pwd = $('t4').val();
  cpwd = $('t5').val();



  console.log(realname)
  console.log(email)
  console.log(uname)
  console.log(pwd)
  console.log(cpwd)


  // val av Special tecken för PW kan läggas till senare| (?=.*?[#?!@$%^&*-]) | 
  let pwd_expression = /^(?=.*?[Z])(?=.*?[a-z])(?=.*?[0-9])/;
  let letters = /^[A-Za-z]+$/;
  let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  //if stats för att vägleda användare att skriva in rätt i formulär
  if (realname == '') {
    alert('Vänligen skriv ditt namn');
  }
  else if (!letters.test(realname)) {
    alert('endast vanliga tecken i namn');
  }
  else if (email == '') {
    alert('skirv en E-port adress');
  }
  else if (!filter.test(email)) {
    alert('Ogiltig E-post');
  }
  else if (uname == '') {
    alert('Ange användarnamn.');
  }
  else if (!letters.test(uname)) {
    alert('Användarnamn får endast innehålla vanliga tecken');
  }
  else if (pwd == '') {
    alert('Vänligen skriv in lösenord');
  }
  else if (cpwd == '') {
    alert('Bekräfta lösenord');
  }
  else if (!pwd_expression.test(pwd)) {
    alert('Lösenord måste innehålla små och stora bokstäver och minst 1 siffra');
  }
  else if (pwd != cpwd) {
    alert('Lösenord matchar inte, var god försök igen!');
  }
  else if ($('t5').val().length < 6) {
    alert('Minst 6 tecken i lösenordet');
  }

  else {
    alert('Tack för din registrering!');

    window.location = "#start";
  }
}

//Reset knapp för att rensa förmulär
function clearFunc() {
  $('t1').val('');
  $('t2').val('');
  $('t3').val('');
  $('t4').val('');
  $('t5').val('');

}
function createAcount() {
  $('#submit').trigger('click'), function () {
    formID = $(this).value
  }

}



