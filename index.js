
fetch('navbar.html')
.then(response => response.text())
.then(html => {
  document.getElementById('navbar').innerHTML = html;
});

fetch('produtos.json')
.then(response => response.json())
.then(products => {
  const promoProducts = document.getElementById('promo-products');
  const vestidosProducts = document.getElementById('vestidos-products');
  const croppedsProducts = document.getElementById('croppeds-products');
  const shortsProducts = document.getElementById('shorts-products');

  const promoItems = products.filter(product => product.promoPrice !== null).slice(0, 5);
  promoItems.forEach(product => {
    promoProducts.innerHTML += createProductCard(product);
  });

  const vestidosItems = products.filter(product => product.category === 'vestidos').slice(0, 5);
  vestidosItems.forEach(product => {
    vestidosProducts.innerHTML += createProductCard(product);
  });

  const croppedsItems = products.filter(product => product.category === 'cropped').slice(0, 5);
  croppedsItems.forEach(product => {
    croppedsProducts.innerHTML += createProductCard(product);
  });

  const shortsItems = products.filter(product => product.category === 'shorts').slice(0, 5);
  shortsItems.forEach(product => {
    shortsProducts.innerHTML += createProductCard(product);
  });
});

function createProductCard(product) {
return `
  <div class="col-md-2">
    <div class="card mb-3">
      <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">
          ${product.promoPrice ? `<s>R$ ${product.price.toFixed(2)}</s> <strong>R$ ${product.promoPrice.toFixed(2)}</strong>` : `<strong>R$ ${product.price.toFixed(2)}</strong>`}
        </p>
        <a href="produto.html?id=${product.id}" class="btn btn-primary">Ver Produto</a>
      </div>
    </div>
  </div>
`;
}