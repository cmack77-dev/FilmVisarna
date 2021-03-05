// let realname
// let email
// let uname
// let pwd
// let cpwd

function registration () {
  storage.realname = $('#t1').val()
  storage.email = $('#t2').val()
  storage.uname = $('#t3').val()
  storage.pwd = $('#t4').val()
  storage.cpwd = $('#t5').val()

  console.log(storage.realname)
  console.log(storage.email)
  console.log(storage.uname)
  console.log(storage.pwd)
  console.log(storage.cpwd)

  // val av Special tecken för PW kan läggas till senare| (?=.*?[#?!@$%^&*-]) |
  let pwd_expression = /^(?=.*?[Z])(?=.*?[a-z])(?=.*?[0-9])/
  let letters = /^[A-Za-z]+$/
  let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  //if stats för att vägleda användare att skriva in rätt i formulär
  if (storage.realname == '') {
    alert('Vänligen skriv ditt namn')
  } else if (!letters.test(storage.realname)) {
    alert('endast vanliga tecken i namn')
  } else if (storage.email == '') {
    alert('skriv en E-post adress')
  } else if (!filter.test(storage.email)) {
    alert('Ogiltig E-post')
  } else if (storage.uname == '') {
    alert('Ange användarnamn.')
  } else if (!letters.test(storage.uname)) {
    alert('Användarnamn får endast innehålla vanliga tecken')
  } else if (storage.pwd == '') {
    alert('Vänligen skriv in lösenord')
  } else if (storage.cpwd == '') {
    alert('Bekräfta lösenord')
  } else if (!pwd_expression.test(storage.pwd)) {
    alert('Lösenord måste innehålla små och stora bokstäver och minst 1 siffra')
  } else if (storage.pwd != storage.cpwd) {
    alert('Lösenord matchar inte, var god försök igen!')
  } else if ($('#t5').val().length < 6) {
    alert('Minst 6 tecken i lösenordet')
  } else {
    alert('Tack för din registrering!')

    window.location = '#start'
  }
}

//Reset knapp för att rensa förmulär
function clearFunc () {
  $('#t1').val('')
  $('#t2').val('')
  $('#t3').val('')
  $('#t4').val('')
  $('#t5').val('')
}
function createAcount () {
  $('#submit').trigger('click'),
    function () {
      formID = $(this).value
    }
}
