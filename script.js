

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




