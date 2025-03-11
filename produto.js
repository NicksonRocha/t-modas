
 fetch('navbar.html')
 .then(response => response.text())
 .then(html => {
   document.getElementById('navbar').innerHTML = html;
 });

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

fetch('produtos.json')
 .then(response => response.json())
 .then(products => {
   const product = products.find(p => p.id === productId);

   if (product) {
     const imagesHtml = product.images.map((image, index) => `
       <div class="carousel-item ${index === 0 ? 'active' : ''}">
         <img src="${image}" class="d-block w-100" alt="${product.name}">
       </div>
     `).join('');

     const sliderHtml = `
       <div id="carouselExample" class="carousel slide">
         <div class="carousel-inner img-produto">
           ${imagesHtml}
         </div>
         <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
           <span class="carousel-control-prev-icon" aria-hidden="true"></span>
           <span class="visually-hidden">Anterior</span>
         </button>
         <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
           <span class="carousel-control-next-icon" aria-hidden="true"></span>
           <span class="visually-hidden">Próximo</span>
         </button>
       </div>
     `;

     document.getElementById('product-slider').innerHTML = sliderHtml;

     const productInfoHtml = `
       <h1>${product.name}</h1>
       <p><strong>${product.promoPrice ? `R$ ${product.promoPrice.toFixed(2)}` : `R$ ${product.price.toFixed(2)}`}</strong></p>
       ${product.promoPrice ? `<p><s>R$ ${product.price.toFixed(2)}</s></p>` : ''}
       <p>Tamanhos disponíveis: ${product.tamanhos.join(" / ")}</p>
       <p>Cor: ${product.cor}</p>
       <a href="https://wa.me/5582988224623?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20uma%20roupa%20do%20site." class="btn btn-primary" target="_blank">Comprar</a>

     `;

     document.getElementById('product-info').innerHTML = productInfoHtml;
   } else {
     document.getElementById('product-info').innerHTML = '<p>Produto não encontrado.</p>';
   }
 })
 .catch(err => console.error('Erro ao carregar os detalhes do produto:', err));