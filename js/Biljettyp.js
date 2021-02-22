// let vuxna;
// let barn;
// let pensionar;
// console.log('ttetadgajsgdjasdgjasdgajsdg')

// function readNumbers() {

//   $('body').append('<div class="ticketType"></div>')
//   $('.ticketType').append(`
//   <H4>Välj antal biljetter<br></H4>
//   <select id=dropdown-vuxna  ><option value="" disabled selected>Vuxna</option></select>
//   <select id=dropdown-barn  ><option value="" disabled selected>Barn</option></select>
//   <select id=dropdown-pensionar  ><option value="" disabled selected>Pensionär</option></select>
//   `)



//   for (let antal = 1; antal < 21; antal++) {

//     $('#dropdown-vuxna').append(`<option value="${antal}"> ${antal} </option>`)
//     $('#dropdown-barn').append(`<option value="${antal}"> ${antal} </option>`)
//     $('#dropdown-pensionar').append(`<option value="${antal}"> ${antal} </option>`)

//   }

//   $('body').on('click', '#dropdown-vuxna', () => {
//     vuxna = $(this)
//       .val()
//     console.log(vuxna)
//     alert(vuxna)
//   })
//   $('body').on('click', '#ticket-dropdown-barn', () => {
//     barn = $(this)
//       .val()
//   })
//   $('body').on('click', '#ticket-dropdown-pensionar', () => {
//     pensionar = $(this)
//       .val()

//   })

// }
// if (window.location.hash === '#bokning') {
//   readNumbers()
// }


// // let vuxna;
// // let barn;
// // let pensionar;
// // console.log('ttetadgajsgdjasdgjasdgajsdg')

// // function readNumbers() {
// //   $('body').append(`<form>
// //   <div class="ticketTypeNormal"></div>
// //   <select id="#ticket-dropdown-vuxna>
// //   <select id ="#ticket-barn">
// //   <select id ="#ticket-pensionar">
// //   </form>`)

// //   $('.ticketTypeNormal').append('<H4>Välj antal biljetter<br></H4>')
// //   $('#ticket-dropdown-vuxna').append('<option value="" disabled selected>Vuxna</option>')
// //   $('#ticket-dropdown-barn').append('<option value="" disabled selected>Barn</option>')
// //   $('#ticket-dropdown-pensionar').append('<option value="" disabled selected>Pensionär</option>')

// //   console.log('testing')
// //   for (let antal = 1; antal < 25; antal++) {

// //     $('#ticket-dropdown-vuxna').append(`<option value="${antal}"> ${antal} </option>`)
// //     $('#ticket-dropdown-barn').append(`<option value="${antal}"> ${antal} </option>`)
// //     $('#ticket-dropdown-pensionar').append(`<option value="${antal}"> ${antal} </option>`)

// //   }

// //   $('body').on('click', '#ticket-dropdown-vuxna', () => {
// //     vuxna = $(this)
// //       .val()
// //   })
// //   $('body').on('click', '#ticket-dropdown-barn', () => {
// //     barn = $(this)
// //       .val()
// //   })
// //   $('body').on('click', '#ticket-dropdown-pensionar', () => {
// //     pensionar = $(this)
// //       .val()

// //   })
// // }
// // $('main').append(readNumbers)
