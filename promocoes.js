
fetch('navbar.html')
.then(response => response.text())
.then(html => {
  document.getElementById('navbar').innerHTML = html;
});

fetch('produtos.json')
.then(response => response.json())
.then(products => {
  const promoGrid = document.getElementById('promo-grid');

  const promoProducts = products.filter(product => product.promoPrice !== null);

  promoProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('col-md-4', 'mb-4');

    productCard.innerHTML = `
      <div class="card">
        <div class="card-img-top">
          <img src="${product.images[0]}" class="img-fluid" alt="${product.name}">
        </div>
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">
            <strong>De: <s>R$ ${product.price.toFixed(2)}</s></strong><br>
            <strong>Por: R$ ${product.promoPrice.toFixed(2)}</strong>
          </p>
          <a href="produto.html?id=${product.id}" class="btn btn-primary">Ver Produto</a>
        </div>
      </div>
    `;

    promoGrid.appendChild(productCard);
  });

  if (promoProducts.length === 0) {
    promoGrid.innerHTML = `<p class="text-center">Nenhum produto em promoção no momento.</p>`;
  }
})
.catch(err => console.error('Erro ao carregar os produtos:', err));