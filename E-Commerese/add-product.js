const form = document.getElementById("productForm");
const message = document.getElementById("message");
const productList = document.getElementById("productList");

function loadProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    productList.innerHTML = "";

    if (products.length === 0) {
        productList.innerHTML = "<p>No products added yet.</p>";
        return;
    }

    products.forEach((product) => {
        productList.innerHTML += `
            <div class="product-item">
                <span>${product.name} - ₹${product.price}</span>
                <button onclick="deleteProduct(${product.id})" class="delete-btn">
                    Delete
                </button>
            </div>
        `;
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("pname").value.trim();
    const price = Number(document.getElementById("pprice").value);
    const image = document.getElementById("pimage").value.trim();

    if(name === "" || image === "") {
        message.innerHTML = "❌ All fields are required";
        message.style.color = "red";
        return;
    }

    if(price <= 0) {
        message.innerHTML = "❌ Price must be greater than 0";
        message.style.color = "red";
        return;
    }

    // Get old products
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Add new product
    const newProduct = {
        id: Date.now(),
        name: name,
        price: Number(price),
        image: image
    };

    products.push(newProduct);

    localStorage.setItem("products", JSON.stringify(products));

    message.innerHTML = "✅ Product Added Successfully!";
    message.style.color = "green";

    form.reset();
    loadProducts();
});

function deleteProduct(id) {

    if(confirm("Are you sure you want to delete this product?")){

        let products = JSON.parse(localStorage.getItem("products")) || [];

        products = products.filter(product => product.id !== id);

        localStorage.setItem("products", JSON.stringify(products));

        loadProducts();
    }
}

window.deleteProduct = deleteProduct;

loadProducts();