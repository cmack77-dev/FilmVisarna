//

async function initialPage () {

  let html = `
    ${await $.get('html-partials/header.html')}
    ${await $.get('html-partials/first.html')}
    <main></main>
    ${await $.get('html-partials/footer.html')}
  `
  $('body').prepend(html)
 
  loadMainSection()
}


let mainContentCache = {}

async function loadMainSection () {
  
  $('header nav a').removeClass('active')
  $(`a[href="${location.hash}"]`).addClass('active')

  // calculate a file name based on the location hash
  let fileName = 'html-partials/' + location.hash.slice(1) + '.html'

  let html;
  // get the html from our cache if possible
  if (mainContentCache[fileName]) {
    html = mainContentCache[fileName]
  }
  // otherwise from reading the file with $.get
  else {
    // First check if the page should be built dynamically
    let dynFunc = dynamicPages[location.hash.slice(1)]
    // if so call the function in dynamicPages
    if (dynFunc) {
      html = await dynFunc()
    }
    // else try to read the page from the html-partials folder
    else {
      html = await $.get(fileName).catch(e => 'error')
    }
  }

  if (html === 'error') {
    // if we have an error - we could not get the content from file
    // then navigate to another url / another hash - #start
    location.hash = '#start'
  } else {
    // otherwise we have read the hmtl successfully from file
    // so place it in the cache
    // if you do not want to cache dynamic pages
    // you would have to write a small if(dynFunc) here ;)
    mainContentCache[fileName] = html
    // and then show it in the DOM
    $('main').replaceWith(html)
  }
}

// Make loadMainSection run on every url/hash change
// (window.onhashchange sets an event listener on hash changes)
window.onhashchange = loadMainSection

initialPage()


