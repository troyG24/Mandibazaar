// Select all elements with IDs "num", "plus", and "minus"
let nums = document.querySelectorAll("#num");
let pluses = document.querySelectorAll("#plus");
let minuses = document.querySelectorAll("#minus");

//new
const addToCartForm = document.getElementById('addToCartForm');
const numberInput = document.getElementById('numberInput');


// Iterate over each element and attach event listeners
nums.forEach((num, index) => {
    let currentValue = 0;

    pluses[index].addEventListener('click', () => {
        currentValue++;
        num.textContent = currentValue;
        numberInput.value = num.textContent;
    });

    minuses[index].addEventListener('click', () => {
        if (currentValue > 0) {
            currentValue--;
            num.textContent = currentValue;
            numberInput.value = num.textContent;
        }
    });

    
});



// // Event listener for form submission
// addToCartForm.addEventListener('submit', (event) => {
//     // Prevent default form submission behavior
//     event.preventDefault();
    
//     // Submit the form
//     addToCartForm.submit();
//   });
