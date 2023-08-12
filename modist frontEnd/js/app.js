const bar = document.getElementById("bar");
const close = document.getElementById("close");
const navbar = document.getElementById("navbar");

bar.onclick = ()=>{
  navbar.classList.add("active");
}

close.onclick = ()=>{
  navbar.classList.remove("active");
}
const loadAllProducts = async () => {
  const response = await fetch('http://localhost:8080/api/products');
  const allProducts = await response.json();
  console.log(allProducts.data);
  return allProducts.data;
}

const productContainer = document.getElementById('product-container');
const displaySingleProduct = (allProducts) => {
  
  productContainer.textContent = '';
  allProducts.forEach(product => {
      const {description, category, name,image,price} = product;
      const singleProductDiv = document.createElement('div');
      singleProductDiv.innerHTML = ` <div class="pro">
      <img src=
      ${image} />
      <div class="des">
      <div class="des">
      <span>${description} </span>
      <h5>${name}</h5>
        <span>${category} </span>
        <h4>$ ${price}</h4>
      </div>
      <i class="fa fa-shopping-cart cart"></i>
      
      </div>

      `;
      productContainer.appendChild(singleProductDiv);
  })

}

const displayInitialProduct = async () => {
  const allProducts = await loadAllProducts();
  displaySingleProduct(allProducts);
}

displayInitialProduct();