const custName = document.getElementById("custName");
const billItems = document.getElementById("billItems");
const grandTotal = document.getElementById("grandTotal");

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const customer = JSON.parse(localStorage.getItem("customer")) || {};

if(cart.length === 0){
    alert("Cart is empty");
    window.location.href = "index.html";
}

// Customer Details
custName.innerText = customer.name || "";

let total = 0;
billItems.innerHTML = "";

cart.forEach((item, index) => {

    const price = Number(item.price);
    const qty = Number(item.quantity);  
    const itemTotal = price * qty;

    total += itemTotal;

    billItems.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>₹${price}</td>
            <td>${qty}</td>
            <td>₹${itemTotal}</td>
        </tr>
    `;
});

grandTotal.innerText = total;

function completeOrder() {

    alert("🎉 Order Placed Successfully!");

    localStorage.removeItem("cart");
    localStorage.removeItem("customer");

    window.location.href = "index.html";
}