fetch("https://dummyjson.com/products/search?q=phone")
  .then((res) => res.json())
  .then((data) => displayProducts(data.products));

function displayProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  products.forEach((product) => {
    const card = `
        <div class="col-lg-3 col-md-6 col-12 mb-4">
            <div class="card h-100 shadow-sm product-card">
                
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">

                <div class="card-body d-flex flex-column">
                
                    <h6 class="card-title">${product.title}</h6>
                    
                    <p class="text-muted small">${product.description.substring(0, 50)}...</p>

                    <h5 class="text-primary fw-bold">
                        $ ${product.price}
                        <span class="badge bg-danger ms-2">${product.discountPercentage}% OFF</span>
                    </h5>

                    <p class="text-warning mb-2">⭐ ${product.rating}</p>

                    <button class="btn btn-primary add-btn">Add to cart</button>
                </div>
            </div>
        </div>
    `;

    container.innerHTML += card;
  });

  handleCartButtons();
}

let cartCount = 0;

function handleCartButtons() {
  const buttons = document.querySelectorAll(".add-btn");
  const cartDisplay = document.getElementById("cart-count");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.disabled) {
        btn.textContent = "Added";
        btn.disabled = true;
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-success");

        cartCount++;
        cartDisplay.textContent = cartCount;
      }
    });
  });
}
