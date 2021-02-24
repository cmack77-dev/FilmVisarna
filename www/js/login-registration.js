let sparat_namn1;
function registration() {
  console.log('teeeestregg')

  let name = document.getElementById("t1").value;
  let email = document.getElementById("t2").value;
  let uname = document.getElementById("t3").value;
  let pwd = document.getElementById("t4").value;
  let cpwd = document.getElementById("t5").value;
  console.log(name)
  console.log(email)
  console.log(uname)
  console.log(pwd)
  console.log(cpwd)

  // val av Special tecken för PW kan läggas till senare| (?=.*?[#?!@$%^&*-]) | 
  let pwd_expression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/;
  let letters = /^[A-Za-z]+$/;
  let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (name == '') {
    alert('Vänligen skriv ditt namn');
  }
  else if (!letters.test(name)) {
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
  else if (document.getElementById("t5").value.length < 6) {
    alert('Minst 6 tecken i lösenordet');
  }

  else {
    alert('Tack för din registrering!');

    window.location = "#start";
  }
}
function clearFunc() {
  document.getElementById("t1").value = "";
  document.getElementById("t2").value = "";
  document.getElementById("t3").value = "";
  document.getElementById("t4").value = "";
  document.getElementById("t5").value = "";
}


registration()
