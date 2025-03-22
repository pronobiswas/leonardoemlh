let selectedProduct = [];
const productTitle = document.getElementById("productTitle");
const productSummary = document.getElementById("productSummary");
const dropdownbutton = document.getElementById("dropdownbutton");
const fullScreenSummary = document.getElementById("fullScreenSummary");
const dropdown_middle = document.querySelector(".dropdown_middle");
const boxes = document.querySelectorAll(".box");
const arrivalBox = document.querySelectorAll(".arrivalBox");
const arivalWindow = document.querySelectorAll(".arivalWindow");
const box = document.querySelector(".dropdown_middle");
const continueBtn1 = document.getElementById("continueBtn");
const continue2ndPhase = document.getElementById("continue2ndPhase");
const continue3rdPhase = document.getElementById("pickUpBtn");
const packegingContinue = document.getElementById("packegingContinue");
// ----phase----
const firstPhase = document.getElementById("firstPhase");
const secondPhase = document.getElementById("secondPhase");
const thirdPhase = document.getElementById("thirdPhase");
const fourthPhase = document.getElementById("fourthPhase");
const fifthPhase = document.getElementById("fifthPhase");
// ====secondphase====
const hiddenFildWarper = document.querySelector("#hiddenFildWarper");
const showForm = document.getElementById("showForm");
// ===form inputs====
let selectedArea = document.getElementById("selectedArea");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let buildingNumber = document.getElementById("buildingNumber");
let addressLine = document.getElementById("addressLine");
let addressLine2 = document.getElementById("addressLine2");
let town = document.getElementById("town");
let postCode = document.getElementById("postCode");
let SpecialInstuction = document.getElementById("SpecialInstuction");


let userDetails = {
    selectedArea: "",
    firstName: "",
    lastName: "",
    buildingNumber: "",
    addressLine: "",
    addressLine2: "",
    town: "",
    postCode: "",
    SpecialInstuction: "",
}

let requireText = {
    selectedArea: "",
    firstName: "",
    lastName: "",
    buildingNumber: "",
    addressLine: "",
    addressLine2: "",
    town: "",
    postCode: "",
    SpecialInstuction: "",
}
let customItem = {}; 




// =====work with nav box=====
boxes[0].addEventListener('click', () => {
    firstPhase.classList.remove("hidden");
    secondPhase.classList.add("hidden");
    thirdPhase.classList.add("hidden");
    fourthPhase.classList.add("hidden");
    fifthPhase.classList.add("hidden");
})
boxes[1].addEventListener('click', () => {
    firstPhase.classList.add("hidden");
    secondPhase.classList.remove("hidden");
    thirdPhase.classList.add("hidden");
    fourthPhase.classList.add("hidden");
    fifthPhase.classList.add("hidden");
})
boxes[2].addEventListener('click', () => {
    firstPhase.classList.add("hidden");
    secondPhase.classList.add("hidden");
    thirdPhase.classList.remove("hidden");
    fourthPhase.classList.add("hidden");
    fifthPhase.classList.add("hidden");
})
boxes[3].addEventListener('click', () => {
    firstPhase.classList.add("hidden");
    secondPhase.classList.add("hidden");
    thirdPhase.classList.add("hidden");
    fourthPhase.classList.remove("hidden");
    fifthPhase.classList.add("hidden");
})
boxes[4].addEventListener('click', () => {
    firstPhase.classList.add("hidden");
    secondPhase.classList.add("hidden");
    thirdPhase.classList.add("hidden");
    fourthPhase.classList.add("hidden");
    fifthPhase.classList.remove("hidden");
})
// ====boxes click=====
// ====fetch data from dymmyapi====
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



            // ========increment ========
            incrementBtn.addEventListener("click", function () {

                continueBtn1.removeAttribute("disabled");
                document.getElementById("firstPhaseWarn").innerHTML = "";
                let count = parseInt(result.textContent);
                result.textContent = count + 1;

                // ====== Get the product ID from the button=======
                const productId = incrementBtn.getAttribute("data-product-id");

                //===== Find the product object from the products array=====
                let clickedProduct = products.find(p => p.id == productId);

                // Check if the product is already in selectedProduct
                let existingProduct = selectedProduct.find(p => p.id == productId);

                // ====update selected product=====
                if (!selectedProduct.find(p => p.id == productId)) {
                    selectedProduct.push(clickedProduct);
                    clickedProduct.productQuantity = 1;
                    product.subtotal = parseInt(clickedProduct.price) * parseInt(clickedProduct.productQuantity);
                    showProductSummary();
                } else {
                    clickedProduct.productQuantity += 1;
                    product.subtotal = product.price * product.productQuantity;
                    showProductSummary();
                }
                // ==calculate the total value==
                function calculateTotalSubtotal() {
                    let totalSubtotal = selectedProduct.reduce((sum, item) => sum + item.subtotal, 0);
                    return totalSubtotal.toFixed(2); 
                }
                const calculatedPrice = calculateTotalSubtotal();
                document.getElementById("totalPrice").innerHTML = `$ ${calculatedPrice}`;
                document.getElementById("totalPrice2").innerHTML = `$ ${calculatedPrice}`;
                document.getElementById("totalDue").innerHTML = `$ ${calculatedPrice}`;
                document.getElementById("buttomPrice").innerHTML = `$ ${calculatedPrice}`;
                

            });
            // =====decrement btn========
            // =====decrement btn========
            decrementBtn.addEventListener("click", function () {
                // ====== Get the product ID from the button=======
                const productId = incrementBtn.getAttribute("data-product-id");
                //===== Find the product object from the products array=====
                let clickedProduct = products.find(p => p.id == productId);
                let count = parseInt(result.textContent);

                if (count > 0) {
                    result.textContent = count - 1;
            
                    // ==Find product in selectedProduct array==
                    let existingProductIndex = selectedProduct.findIndex(p => p.id == productId);
            
                    if (existingProductIndex !== -1) {
                        let existingProduct = selectedProduct[existingProductIndex];
            
                        if (existingProduct.productQuantity > 1) {
                            existingProduct.productQuantity -= 1;
                            existingProduct.subtotal = existingProduct.price * existingProduct.productQuantity;
                        } else {
                            // ==Remove product if quantity reaches 0==
                            selectedProduct.splice(existingProductIndex, 1);
                        }
                    }
                    
                    showProductSummary();
                }
                
                // ==calculate the total value==
                function calculateTotalSubtotal() {
                    let totalSubtotal = selectedProduct.reduce((sum, item) => sum + item.subtotal, 0);
                    return totalSubtotal.toFixed(2); 
                }
                // ==show the totalvalue==
                const calculatedPrice = calculateTotalSubtotal();
                document.getElementById("totalPrice").innerHTML = `$ ${calculatedPrice}`;
                document.getElementById("totalPrice2").innerHTML = `$ ${calculatedPrice}`;
                document.getElementById("totalDue").innerHTML = `$ ${calculatedPrice}`;
                document.getElementById("totalDue2").innerHTML = `$ ${calculatedPrice}`;
                document.getElementById("buttomPrice").innerHTML = `$ ${calculatedPrice}`;
            });

            // =====view on the board====
            function showProductSummary() {
                document.getElementById("selectedProductLength").innerHTML = `${selectedProduct.length}`;

                const productListContainer = document.querySelector(".productListItem");
                const productListItemButtom = document.querySelector(".productListItemButtom");
                productListContainer.innerHTML = "";
                productListItemButtom.innerHTML = "";
                selectedProduct.forEach((item) => {
                    productListContainer.innerHTML += `
                    <div class="perItem">
                        <p>${item.title}</p>
                        <span>$${item.subtotal.toFixed(2)}</span>
                    </div>
                    ` ;
                    productListItemButtom.innerHTML += `
                    <div class="perItem">
                        <p>${item.title}</p>
                        <span>$${item.subtotal.toFixed(2)}</span>
                    </div>
                    ` ;
                    

                })
            }

        });

    })
    .catch(error => console.error("Error fetching products:", error));


// =======validation first phase========
// document.addEventListener("DOMContentLoaded", function (){
//     if (selectedProduct.length < 1) {
//         continueBtn1.setAttribute("disabled", "true"); 
//         alert("warn")
//     } else {
//         continueBtn1.removeAttribute("disabled"); // Correct way to enable
//     }
// });


// &&&&&&&&&&&input function "first phase"&&&&&&&&&&&&&&&
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll('.inputbox input');
    const inputs2ndPhase = document.querySelectorAll('.col input');
    const labels = document.querySelectorAll('.inputbox label');
    const labels2ndPhase = document.querySelectorAll('.col label');


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
function collectCustomItemData (e){
    customItem = {
        ...customItem,
        [e.target.name]  :e.target.value,
    }
    
}
function handleAddCustomItem (event){
    console.log(customItem);
    event.preventDefault()
    let customItemss =[];
    customItemss.push(customItem)
    
}

// ========form validation======

// =======collect data=====
function hanndleInput(event) {
    userDetails = {
        ...userDetails,
        [event.target.name]: event.target.value.trim()
    }
    let clearSpan = document.querySelector(".clearSpan");

    if (event.target.name === "selectedArea") {
        selectedArea.classList.remove("requiredRow");
    }
    if (userDetails.selectedArea.length > 3) {

        clearSpan.classList.remove("hidden");
    } else {
        clearSpan.classList.add("hidden");
    }

    if (event.target.name === "firstName") {
        firstName.classList.remove("requiredRow");
    }
    if (event.target.name === "lastName") {
        lastName.classList.remove("requiredRow");
    }
    if (event.target.name === "buildingNumber") {
        buildingNumber.classList.remove("requiredRow");
    }
    if (event.target.name === "addressLine") {
        addressLine.classList.remove("requiredRow");
    }
    if (event.target.name === "town") {
        town.classList.remove("requiredRow");
    }
    if (event.target.name === "postCode") {
        postCode.classList.remove("requiredRow");
    }
    if (event.target.name === "SpecialInstuction") {
        SpecialInstuction.classList.remove("requiredRow");
    }

    document.getElementById("secondPhaseWarn").innerHTML = "";

};
// %%%%%%%%%%form validation%%%%%%
function validateform() {

    let validate = "false";

    if (userDetails.selectedArea == "") {
        selectedArea.classList.add("requiredRow");
    }
    if (userDetails.firstName == "") {
        firstName.classList.add("requiredRow")
    }
    if (userDetails.lastName == "") {
        lastName.classList.add("requiredRow")
    }
    if (userDetails.buildingNumber == "") {
        buildingNumber.classList.add("requiredRow")
    }
    if (userDetails.addressLine == "") {
        addressLine.classList.add("requiredRow")
    }
    if (userDetails.town == "") {
        town.classList.add("requiredRow")
    }
    if (userDetails.postCode == "") {
        postCode.classList.add("requiredRow")
    }
    if (userDetails.SpecialInstuction == "") {
        SpecialInstuction.classList.add("requiredRow")
    }

    if (userDetails.selectedArea == "" || userDetails.firstName == "" || userDetails.lastName == "" || userDetails.buildingNumber == "" || userDetails.addressLine == "" || userDetails.town == "" || userDetails.postCode == "" || userDetails.SpecialInstuction == "") {
        validate = "false"
    } else { validate = "true" }


    return validate
}

// $$$$$$$$$$$$ second phase $$$$$$$$$$$$$$$$
showForm.addEventListener('click', () => {
    hiddenFildWarper.classList.add("showPuldown");
    showForm.parentElement.classList.add("hidden")
})








// =====work with next button====
document.addEventListener("DOMContentLoaded", function () {
    const continueBtn1 = document.getElementById("continueBtn");
    const continue2ndPhase = document.getElementById("continue2ndPhase");

    const firstPhase = document.getElementById("firstPhase");
    const secondPhase = document.getElementById("secondPhase");
    const thirdPhase = document.getElementById("thirdPhase");

    const boxes = document.querySelectorAll(".box");
    const lines = document.querySelectorAll(".line");




    continueBtn1.addEventListener("click", () => {
        let firstPhaseWarn = document.getElementById("firstPhaseWarn");
        if (selectedProduct.length < 1) {
            firstPhaseWarn.innerHTML = "Select an Item to go next step";

        } else {
            firstPhaseWarn.innerHTML = "";
            firstPhase.classList.add("hidden");
            secondPhase.classList.remove("hidden");
            continue3rdPhase.classList.add("hidden");
            fourthPhase.classList.add("hidden");
            fifthPhase.classList.add("hidden");
            moveMiniBox(0, 1);
            chaneTheboxColor(1);
            changeTheLineColor(0);
        }

    });

    continue2ndPhase.addEventListener("click", () => {
        let validatelog = validateform();
        let showformWarppper = document.getElementById("showformWarppper");

        if (validatelog == "true") {
            console.log("Second button clicked");
            firstPhase.classList.add("hidden");
            secondPhase.classList.add("hidden");
            thirdPhase.classList.remove("hidden");
            moveMiniBox(1, 2);
            chaneTheboxColor(2);
            changeTheLineColor(1);
        } else {
            document.getElementById("secondPhaseWarn").innerHTML = "fill the form correctly"
        }
    });
    continue3rdPhase.addEventListener('click', () => {
        console.log("third button clicked");
        firstPhase.classList.add("hidden");
        secondPhase.classList.add("hidden");
        thirdPhase.classList.add("hidden");
        fourthPhase.classList.remove("hidden");
        moveMiniBox(2, 3);
        chaneTheboxColor(3);
        changeTheLineColor(2);
    });
    packegingContinue.addEventListener('click', () => {
        console.log("from forth phase click button");
        fifthPhase.classList.remove("hidden")
        firstPhase.classList.add("hidden");
        secondPhase.classList.add("hidden");
        thirdPhase.classList.add("hidden");
        fourthPhase.classList.add("hidden");
        moveMiniBox(3, 4);
        chaneTheboxColor(4);
        changeTheLineColor(3);

    })
    // ======Move the miniBox from one box to the anothe box=======
    function moveMiniBox(fromIndex, toIndex) {
        let existingMiniBox = boxes[fromIndex].querySelector(".miniBox");
        let targetMiniBox = boxes[toIndex].querySelector(".miniBox");

        // Remove the miniBox from the current box if it exists
        if (existingMiniBox) {
            boxes[fromIndex].removeChild(existingMiniBox);
        }

        // Append miniBox only if it doesn't already exist in the target box
        if (!targetMiniBox) {
            boxes[toIndex].appendChild(existingMiniBox);
        }
    }
    // ====changeboxColor===
    function chaneTheboxColor(index) {
        boxes[index].style.backgroundColor = "#00A899";
    }
    // ====changelinecolor===
    function changeTheLineColor(index) {
        lines[index].style.backgroundColor = "#00A899";
    }


});

// ======fourth section======
const packagingBox = document.querySelectorAll(".packagingBox")
packagingBox.forEach((perBox) => {
    perBox.addEventListener('click', () => {
        packagingBox.forEach((box) => box.classList.remove("active"));
        perBox.classList.add("active")
    })
});
packagingBox[0].addEventListener('click', () => {
    document.querySelector(".supplyApointment").style.display = "block";
    document.getElementById('packegingContinue').classList.remove("hidden");
});
packagingBox[1].addEventListener('click', () => {
    document.querySelector(".supplyApointment").style.display = "none";
    document.getElementById('packegingContinue').classList.remove("hidden");
});



// %%%%%%%%  third phase  %%%%%%%%%%
document.querySelectorAll(".free").forEach((item) => {
    item.addEventListener('click', () => {
        document.querySelector(".arivalWindow").classList.remove("hidden");
    })
});
document.querySelectorAll(".paid").forEach((item) => {
    item.addEventListener('click', () => {
        document.querySelector(".arivalWindow").classList.remove("hidden");
    })
});

arrivalBox[0].addEventListener('click', () => {
    continue3rdPhase.classList.remove("hidden");
});
arrivalBox[1].addEventListener('click', () => {
    document.querySelector(".scheduleWarpper").classList.remove("hidden");
    continue3rdPhase.classList.remove("hidden");
});

// ====pulldown======
dropdownbutton.addEventListener('click', () => {

    fullScreenSummary.classList.toggle("showPuldown");
    dropdownbutton.classList.toggle("rotate");
    //  Toggle the rotation classes correctly
    if (dropdownbutton.classList.contains("rotateReverse")) {
        dropdownbutton.classList.remove("rotateReverse");
        dropdownbutton.classList.add("rotate");
    } else {
        dropdownbutton.classList.remove("rotate");
        dropdownbutton.classList.add("rotateReverse");
    }
})

// =======mouse movement========
// document.addEventListener("DOMContentLoaded", function () {
//     const cursor = document.querySelector(".custom-cursor");

//     document.addEventListener("mousemove", (e) => {
//         cursor.style.left = `${e.clientX}px`;
//         cursor.style.top = `${e.clientY}px`;
//     });

//     // Make the cursor bigger when hovering over clickable elements
//     document.querySelectorAll("button, a").forEach((el) => {
//         el.addEventListener("mouseenter", () => {
//             cursor.style.transform = "scale(1.5)";
//         });
//         el.addEventListener("mouseleave", () => {
//             cursor.style.transform = "scale(1)";
//         });
//     });
// });

// ==========togole hidden class========






