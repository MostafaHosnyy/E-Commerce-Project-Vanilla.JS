const bar = document.getElementById("bar");
const close = document.getElementById("close");
const navbar = document.getElementById("navbar");
const shopContainer = document.getElementById('shop-container');
// const categoryContainer = document.getElementById('category-list');

bar.onclick = ()=>{
  navbar.classList.add("active");}

close.onclick = ()=>{
  navbar.classList.remove("active");}

const loadAllProducts = async () => {
  const response = await fetch('http://localhost:8080/api/products');
  const allProducts = await response.json();
  return allProducts.data;
}
const displaySingleProduct = (allProducts) => {
  shopContainer.textContent = '';
  allProducts.forEach(product => 
    {
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
      shopContainer.appendChild(singleProductDiv);
  })

}
// categoryContainer.addEventListener('click', async (event) => {
//   const categoryValue = event.target.innerText;
//   const allProducts = await loadAllProducts();
//   const matchedProducts = allProducts.filter(product =>
//      product.category.includes(categoryValue)
//      );
//   displaySingleProduct(matchedProducts);
// });

// const displayCategories = async () => {
//   const categoryContainer = document.getElementById('category-list');
//   const products = await loadAllProducts();
//   const uniqueCategory = [];
//   products.forEach(product => 
//     {
//       if (uniqueCategory.indexOf(product.category) === -1)
//        {
//           uniqueCategory.push(product.category);
//       }
//   });

//   uniqueCategory.forEach(category => {
//       const li = document.createElement('li');
//       li.innerText = category;
//       categoryContainer.appendChild(li);
//   })
// }

const displayInitialProduct = async () => {
  const allProducts = await loadAllProducts();
  displaySingleProduct(allProducts);
}

displayInitialProduct();
// displayCategories();