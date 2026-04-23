const cartContainer = document.getElementById("cartContainer");
const totalElement = document.getElementById("total");

function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<h2 class='empty-cart'>Cart is Empty 😢</h2>";
        totalElement.innerText = 0;
        return;
    }

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

       cartContainer.innerHTML += 
       `
       <div class="card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>

        <div class="qty-box">
            <button class="qty-btn minus-btn" onclick="decreaseQty(${index})">➖</button>
            <span>${item.quantity}</span>
            <button class="qty-btn plus-btn" onclick="increaseQty(${index})">➕</button>
        </div>

        <p>Total: ₹${item.price * item.quantity}</p>

        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
       </div>
       `;
    });

    totalElement.innerText = total;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function increaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function decreaseQty(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

displayCart();

function goToBill() {

    const name = document.getElementById("customerName").value.trim();

    if(name === ""){
        alert("Please enter your name");
        return;
    }

    const customer = {
        name: name
    };

    localStorage.setItem("customer", JSON.stringify(customer));

    window.location.href = "bill.html";
}  