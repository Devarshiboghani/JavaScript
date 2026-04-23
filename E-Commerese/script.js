const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");
const productContainer = document.getElementById("productContainer");

// SEARCH FILTER
searchInput.addEventListener("keyup", function () {
    const searchValue = searchInput.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );

    displayProducts(filtered);
});

// ADD TO CART
function addToCart(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const selected = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: selected.id,
            name: selected.name,
            price: selected.price,
            image: selected.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert("Product Added ✅");
}

// UPDATE CART COUNT
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    cartCount.innerText = totalItems;
}

let products = JSON.parse(localStorage.getItem("products")) || [];

if(products.length === 0){
    products = [
        { id: 1, name: "Smart Watch", price: 1999, image: "https://m.media-amazon.com/images/I/61TapeOXotL.jpg" },
        { id: 2, name: "Headphones", price: 1499, image: "https://png.pngtree.com/png-vector/20250321/ourmid/pngtree-wireless-headphone-png-image_15830312.png" },
        { id: 3, name: "Shoes", price: 2499, image: "https://static.vecteezy.com/system/resources/thumbnails/057/459/962/small/dramatic-traditional-running-shoes-red-and-black-isolated-genuine-png.png" },
        { id: 4, name: "T-Shirt", price: 999, image: "https://5.imimg.com/data5/SELLER/Default/2021/3/ZQ/TO/FV/69219619/womens-clothing.jpg" }
    ];

    localStorage.setItem("products", JSON.stringify(products));
}

// DISPLAY PRODUCTS
function displayProducts(productList) {

    productContainer.innerHTML = "";

    if(productList.length === 0){
        productContainer.innerHTML = "<h3>No products found 😢</h3>";
        return;
    }

    productList.forEach(product => {
        productContainer.innerHTML += `
            <div class="card">
                <img src="${product.image}">
                <h3>${product.name}</h3>
                <p class="price">₹${product.price}</p>
                <div class="btn-group">
                    <button class="cart-add-btn" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
}

// INITIAL LOAD
displayProducts(products);
updateCartCount();