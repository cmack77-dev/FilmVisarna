async function loadMainContent() {

  let dynamicPage = window.location.hash.split("?")[0];
  page = await dynamicPages[dynamicPage]();
  console.log(dynamicPage)
  if (!page) {
    page = dynamicPages["#error"]()
  }

  $("main").html(page);
}
window.onhashchange = loadMainContent;
setTimeout(loadMainContent, 0)





