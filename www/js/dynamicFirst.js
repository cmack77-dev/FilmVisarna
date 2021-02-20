let dynamicPages = {

    async function readJsonFilmer(title) {
        let aktuellt = await $.getJSON('JSON-filer/filmer.json')
        //console.log(aktuellt);
        showJsonasHtml(aktuellt)
      }
      function showJsonasHtml(aktuellt) {
        let $aktuella = $('<div class="filmObj"></div>')
        aktuellt.filter(aktuella => aktuella.title)
          .forEach(aktuella => {
            $aktuella.append(
              '<div><p class="movieClick" onclick="readJson(' + "'" + aktuella.title + "'" + '); "> <img src= "' + aktuella.images + '" </div>'
            )
          })
        $('.firstcolumn').append($aktuella)
      }
      readJsonFilmer()
    
    
    
    async products() {
      // Reading the products from a json file
      let data = await $.getJSON('products.json');
      // Loop through the products and build html
      let html = '<main><h2>Våra tårtor</h2>';
      for (let product of data) {
        html += /*html*/`
          <div class="product">
            <h3>${product.name}</h3>
            <p><b>Pris: </b>${product.price}</p>
            <p><b>Räcker till: </b>${product.enoughFor} personer</p>
            <p>${product.description}</p>
          </div>
        `;
      }
      html += '</main>';
      return html;
    }
  
  };