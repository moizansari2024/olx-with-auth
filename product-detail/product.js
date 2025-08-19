// URL se id nikalo
let params = new URLSearchParams(window.location.search);
let productId = params.get("id");

async function getProductDetail() {
  let response = await fetch(`https://dummyjson.com/products/${productId}`);
  let product = await response.json();

  document.getElementById("product-detail").innerHTML = `
    <h1>${product.title}</h1>
    <img src="${product.images[0]}" width="300">
    <p>${product.description}</p>
    <p><strong>Category:</strong> ${product.category}</p>
    <p><strong>Price:</strong> $${product.price}</p>
    <p><strong>Stock:</strong> ${product.stock}</p>
  `;
}

getProductDetail();

