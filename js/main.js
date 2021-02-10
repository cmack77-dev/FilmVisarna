// Build initial page with header, main and footer
// (this only happens once - on a hard page reload)
async function buildInitialPage() {
  // Basic html with header and footer
  // (but empty main section)
  let html = `
    ${await $.get('html-partials/header.html')}
    <main></main>
    ${await $.get('html-partials/footer.html')}
  `;
  $('body').append(html);
  // Now load the main section - the page content

  loadMainSection();
}

// This function will run once on a hard reload
// and then everytime someone clicks a menu link
// or uses the back/forward buttons
async function loadMainSection() {
  let fileName = 'html-partials/' + location.hash.slice(1) + '.html';
  let html = await $.get(fileName);
  $('main').replaceWith(html);
  readJsonFilmer()
}

// Make loadMainSection run on every url/hash change
// (window.onhashchange sets an event listener on hash changes)
window.onhashchange = loadMainSection;

// Start everything
buildInitialPage();


