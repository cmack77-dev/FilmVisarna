let UserBookings

$('body').on('click', '#submitreg', function submitRegistration() {
  let goAhead = true

  storage.realname = $('#t1').val()
  storage.email = $('#t2').val()
  storage.uname = $('#t3').val()
  storage.pwd = $('#t4').val()
  storage.cpwd = $('#t5').val()


  // val av Special tecken för PW kan läggas till senare| (?=.*?[#?!@$%^&*-]) |
  let pwd_expression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/
  let letters = /^[A-Za-z0-9 \båäö]+$/
  let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  //if stats för att vägleda användare att skriva in rätt i formulär
  if (storage.realname == '') {
    $('.formmsg').replaceWith('')
    $('#t1').after('<p class="formmsg">Vänligen skriv ditt Namn*</p>')
  } else if (!letters.test(storage.realname)) {
    $('.formmsg').replaceWith('')
    $('#t1').after('<p class="formmsg">endast vanliga tecken i Namn*</p>')
  } else if (storage.email == '') {
    $('.formmsg').replaceWith('')
    $('#t2').after('<p class="formmsg">skriv en E-post*</p>')
  } else if (!filter.test(storage.email)) {
    $('.formmsg').replaceWith('')
    $('#t2').after('<p class="formmsg">Ogiltig E-post*</p>')
  } else if (storage.uname == '') {
    $('.formmsg').replaceWith('')
    $('#t3').after('<p class="formmsg">Ange Användarnamn*</p>')
  } else if (!letters.test(storage.uname)) {
    $('.formmsg').replaceWith('')
    $('#t3').after(
      '<p class="formmsg">Användarnamn får endast innehålla vanliga tecken*</p>'
    )
  } else if (storage.pwd == '') {
    $('.formmsg').replaceWith('')
    $('#t4').after('<p class="formmsg">Vänligen skriv ett lösenord*</p>')
  } else if (storage.cpwd == '') {
    $('.formmsg').replaceWith('')
    $('#t5').after('<p class="formmsg">Bekräfta lösenord*</p>')
  } else if (!pwd_expression.test(storage.pwd)) {
    $('.formmsg').replaceWith('')
    $('#t4').after(
      '<p class="formmsg">Lösenord måste innehålla små och stora bokstäver och minst 1 siffra*</p>'
    )
  } else if (storage.pwd != storage.cpwd) {
    $('.formmsg').replaceWith('')
    $('#t5').after(
      '<p class="formmsg">Lösenord matchar inte, var god försök igen!*</p>'
    )
  } else if ($('#t5').val().length < 6) {
    $('.formmsg').replaceWith('')
    $('#t5').after('<p class="formmsg">Minst 6 tecken i lösenordet</p>')
  } else {
    formID = $(this).value
    $('.secondcolumn').replaceWith(
      `<div class="secondcolumn"><div class="register"><h3 id="userReg">Tack för din registrering!</h3><p>Vi har skickat en bekräftelse till din email-adress.<br><br>Hjärtligt välkommen <b>${storage.realname}</b>.<br><br>Vi önskar dig en riktigt dag!</p></div></div>`
    )

    let insertVarReg = ''

    insertVarReg += `insert into users values ("${storage.realname}", "${storage.email}", "${storage.uname}", "${storage.pwd}");`

    createUser(insertVarReg)
  }
})
async function showBookings() {
  UserBookings = await db.run(/*sql*/ `select * from bokningar;`)
}

async function createUser(insertVarReg) {
  let result = await db.run(insertVarReg)
}

$('body').on('click', '.loginUser', async () => {

  let loginName = $('#t3').val()
  let loginPW = $('#t4').val()
  let dbname = await db.run(
     /*SQL*/`
     SELECT * FROM users`
  );

  for (let userName of dbname) {
    if (loginName === userName.uname && loginPW === userName.password) {
      window.location = '#mypages'
    }
    else if (loginName != userName.uname) {
      $('.formmsg').replaceWith('')
      $('#t3').after('<p class="formmsg">Felaktigt användarnamn</p>')
    }
    else if (loginPW != userName.password) {
      $('.formmsg').replaceWith('')
      $('#t4').after('<p class="formmsg">Felaktigt lösenord</p>')
    }
  }
})
//Reset knapp för att rensa förmulär
$('body').on('click', '#resetreg', () => {
  $('#t1').val('')
  $('#t2').val('')
  $('#t3').val('')
  $('#t4').val('')
  $('#t5').val('')
})
