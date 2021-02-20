async function loadMainContent() {
  window.onhashchange = async () => {
    let dynamicPage = window.location.hash.split("?")[0];
    page = await dynamicPages[dynamicPage]();
    console.log(dynamicPage)
    if (!page) {
      page = dynamicPages["#error"]()
    }

    $("main").html(page);
  }
}
loadMainContent();


