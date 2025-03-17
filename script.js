let selectedProduct = [];
const productTitle = document.getElementById("productTitle");
const productSummary = document.getElementById("productSummary");
const dropdown_middle = document.querySelector(".dropdown_middle");
console.log(dropdown_middle);





fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        const products = data.products.slice(0, 4);
        const productContainer = document.getElementById("productContainer");
        

        products.forEach(product => {
            // Create product card
            const productCard = document.createElement("div");
            productCard.classList.add("productCard");

            productCard.innerHTML = `
                <div class="item_warpper">
                    <div class="itemImage">
                        <img src="${product.images[0]}" alt="Product Image" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="itemContent">
                        <h3>${product.title}</h3>
                        <p class="dimention">18” x 18” x 16”</p>
                        <p class="price">${product.price}</p>
                    </div>
                    <div class="count">
                        <button class="decrement" data-product-id="${product.id}">-</button>
                        <div class="result">0</div>
                        <button class="increment" data-product-id="${product.id}">+</button>
                    </div>
                </div>
            `;

            productContainer.appendChild(productCard);

            // Select elements within the newly created productCard
            const result = productCard.querySelector(".result");
            const incrementBtn = productCard.querySelector(".increment");
            const decrementBtn = productCard.querySelector(".decrement");

            // Add event listeners
            incrementBtn.addEventListener("click", function () {
                let count = parseInt(result.textContent);
                result.textContent = count + 1;
                // ====== Get the product ID from the button=======
                const productId = incrementBtn.getAttribute("data-product-id");
                //===== Find the product object from the products array=====
                let clickedProduct = products.find(p => p.id == productId);
                // ====update selected product=====
                if(!selectedProduct.find(p => p.id == productId)){
                    selectedProduct.push(clickedProduct)
                    clickedProduct.productQuantity = 1;

                    // ====show the product====
                    selectedProduct.forEach((item)=>{
                        console.log(item);
                        
                    })
                    
                    
                }else{
                    console.log("product alredy exist");
                    clickedProduct.productQuantity += 1;
                }
                
            });

            decrementBtn.addEventListener("click", function () {
                let count = parseInt(result.textContent);
                if (count > 0) {
                    result.textContent = count - 1;
                }
            });

        });

    })
    .catch(error => console.error("Error fetching products:", error));

// ======increment and dddecrement =========
document.querySelectorAll(".item_warpper").forEach(function (wrapper) {
    let result = wrapper.querySelector(".result");
    let incrementBtn = wrapper.querySelector(".increment");
    let decrementBtn = wrapper.querySelector(".decrement");



    incrementBtn.addEventListener("click", function () {
        let count = parseInt(result.textContent);
        result.textContent = count + 1;
    });


    decrementBtn.addEventListener("click", function () {
        let count = parseInt(result.textContent);
        if (count > 0) {
            result.textContent = count - 1;
        }
    });
});
// ==========input function======
document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll('.inputbox input');
    const labels = document.querySelectorAll('.inputbox label');

    // Add event listeners to all inputs
    inputs.forEach(input => {
        // Check if there's any value already in the input
        if (input.value) {
            input.previousElementSibling.classList.add('filled');
        }

        // On focus, add the 'filled' class to the label
        input.addEventListener('focus', () => {
            input.previousElementSibling.classList.add('filled');
        });
        input.addEventListener('click', () => {
            console.log(input.previousElementSibling);
            
        });

        // On blur, remove the 'filled' class if the input is empty
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.previousElementSibling.classList.remove('filled');
            }
        });
    });
});


// =======mouse movement========
document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.querySelector(".custom-cursor");

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Make the cursor bigger when hovering over clickable elements
    document.querySelectorAll("button, a").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.style.transform = "scale(1.5)";
        });
        el.addEventListener("mouseleave", () => {
            cursor.style.transform = "scale(1)";
        });
    });
});