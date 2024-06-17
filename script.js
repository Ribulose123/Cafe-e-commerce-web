document.addEventListener("DOMContentLoaded", () => {
    let products = {
        data: [
            { productName: "chicken wrapper", category: "dessert", price: "30", image: "Images/image/chicken-wrap-doner-with-tomato_140725-10509.jpg" },
            { productName: "Vanila latte", category: "coffee", price: "49", image: "Images/image/latte-coffee-cup_1203-3395.jpg" },
            { productName: "Cappuccion with mashmelow", category: "coffee", price: "99", image: "Images/image/images (12).jpeg" },
            { productName: "Chocalate tea", category: "coffee", price: "29", image: "Images/image/coffee-preparation-concept-still-life_23-2150354610.jpg" },
            { productName: "Chicken sandwich", category: "dessert", price: "129", image: "Images/image/delicious-sandwich_144627-15079.jpg" },
            { productName: "mango smoothie", category: "smoothies", price: "89", image: "Images/image/mango smoothies.webp" },
            { productName: "chocolate gaze donut", category: "dessert", price: "189", image: "Images/image/glazed-chocolate-pink-donuts.jpg" },
            { productName: "Apple peanut smoothie", category: "smoothies", price: "80", image: "Images/image/Apple-Peanut-Butter-Smoothie-1801.jpg" },
            { productName: "Cucumber lemonade", category: "Drinks", price: "40", image: "Images/image/cucumber lemonade.jpg" },
            { productName: "Cappuccion with wipcream", category: "coffee", price: "49", image: "Images/image/rustic-wood-table-holds-frothy-coffee-drinks-generated-by-ai_188544-22883.jpg" },
            { productName: "Cookie", category: "dessert", price: "49", image: "Images/image/cookie.jpeg" },
            { productName: "lemonade", category: "Drinks", price: "40", image: "Images/image/ice lemonade.jpg" },
            { productName: "Raspberries jam donut", category: "dessert", price: "49", image: "Images/image/delicious-donut-raspberries.jpg" },
            { productName: "powered donut", category: "dessert", price: "49", image: "Images/image/snake-doughnuts-with-powdered-sugar.jpg" }
        ]
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderProducts() {
        const productsContainer = document.getElementById("products");
        productsContainer.innerHTML = ""; // Clear existing products

        for (let i of products.data) {
            let card = document.createElement("div");
            card.classList.add("card", i.category.toLowerCase(), "hide");

            let rateCard = document.createElement("div");
            rateCard.classList.add("writeup");

            let rateCardText = document.createElement("h4");
            rateCardText.innerText = "4.5";
            rateCard.appendChild(rateCardText);

            let icon = document.createElement("ion-icon");
            icon.setAttribute("name", "star");
            rateCard.appendChild(icon);
            card.appendChild(rateCard);

            let imgContainer = document.createElement("div");
            imgContainer.classList.add("image-container");

            let image = document.createElement("img");
            image.setAttribute("src", i.image);
            imgContainer.appendChild(image);
            card.appendChild(imgContainer);

            let container = document.createElement("div");
            container.classList.add("container");

            let name = document.createElement("h5");
            name.classList.add("product-name");
            name.innerText = i.productName.toUpperCase();
            container.appendChild(name);

            let cartPrices = document.createElement("div");
            cartPrices.classList.add("cartPrices");

            let price = document.createElement("h6");
            price.innerText = "$" + i.price;
            cartPrices.appendChild(price);

            let cartE = document.createElement("div");
            cartE.classList.add("cart-wheel");
            let cartLink = document.createElement("a");
            cartE.appendChild(cartLink);
            let cartIcon = document.createElement("ion-icon");
            cartIcon.classList.add("icon2");
            cartLink.appendChild(cartIcon);
            cartIcon.setAttribute("name", "cart-outline");
            cartPrices.appendChild(cartE);

            container.appendChild(cartPrices);
            card.appendChild(container);

            cartE.addEventListener("click", (event) => {
                event.stopPropagation();
                addToCart(i);
            });

            productsContainer.appendChild(card);
        }
    }

    window.filterProduct = function(value) {
        let buttons = document.querySelectorAll(".button-value");
        buttons.forEach((button) => {
            if (value.toUpperCase() == button.innerText.toUpperCase()) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });

        let elements = document.querySelectorAll(".card");
        elements.forEach((element) => {
            if (value == "all") {
                element.classList.remove("hide");
            } else {
                if (element.classList.contains(value.toLowerCase())) {
                    element.classList.remove("hide");
                } else {
                    element.classList.add("hide");
                }
            }
        });
    }

    function addToCart(item) {
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartCountElement = document.getElementById("cart-count");
        cartCountElement.innerText = cart.length;
    }

    // Search functionality
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", (event) => {
        const searchValue = event.target.value.toLowerCase();
        let elements = document.querySelectorAll(".card");
        elements.forEach((element) => {
            const productName = element.querySelector(".product-name").innerText.toLowerCase();
            if (productName.includes(searchValue)) {
                element.classList.remove("hide");
            } else {
                element.classList.add("hide");
            }
        });
    });

    renderProducts();
    filterProduct("all");
    updateCartDisplay();

    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    navToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
});
