
 fetch('navbar.html')
 .then(response => response.text())
 .then(html => {
   document.getElementById('navbar').innerHTML = html;
 });

fetch('produtos.json')
 .then(response => response.json())
 .then(products => {
   const category = 'vestidos'; 
   const productGrid = document.getElementById('product-grid');

   products.filter(product => product.category === category).forEach(product => {
     const productBox = document.createElement('div');
     productBox.classList.add('col-md-3', 'mb-4');

     const carouselId = `carousel-${product.id}`;
     const imagesHtml = product.images.map((image, index) => `
       <div class="carousel-item ${index === 0 ? 'active' : ''}">
         <img src="${image}" class="d-block w-100 imgfileira" alt="${product.name}">
       </div>
     `).join('');

     productBox.innerHTML = `
       <div class="card">
         <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
           <div class="carousel-inner">
             ${imagesHtml}
           </div>
           <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
             <span class="carousel-control-prev-icon" aria-hidden="true"></span>
             <span class="visually-hidden">Anterior</span>
           </button>
           <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
             <span class="carousel-control-next-icon" aria-hidden="true"></span>
             <span class="visually-hidden">Próximo</span>
           </button>
         </div>
         <div class="card-body">
           <h5 class="card-title">
             <a class="product-title" href="produto.html?id=${product.id}">${product.name}</a>
           </h5>
           <p class="card-text">
             ${product.promoPrice ? `<s>R$ ${product.price.toFixed(2)}</s> <strong>R$ ${product.promoPrice.toFixed(2)}</strong>` : `<strong>R$ ${product.price.toFixed(2)}</strong>`}
           </p>
         </div>
       </div>
     `;
     productGrid.appendChild(productBox);
   });
 })
 .catch(err => console.error('Erro ao carregar os produtos:', err));