// Function to handle form submission with confirmation
async function handleFormSubmission(product_id, whole_seller_id) {
  // Display confirmation dialog
  var isConfirmed = confirm("Are you sure you want to Delete this item from the cart?");

  if (isConfirmed) {
    console.log(whole_seller_id)
    var request_data = {
      product_id: product_id,
      whole_seller_id: whole_seller_id
    }
    await fetch('/delete_confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Specify the content type as JSON
      },
      body: JSON.stringify(request_data) // Convert data object to JSON string
    }).then(async (response)=>{
      if (response.status == 200){
        alert("Product successfully deleted item from cart")
        await get_cart_cards()
      } else {
        alert("An Error Occurred. Please Try Again Later.")
      }
    })
  }
}

var forms = document.querySelectorAll('form');
forms.forEach(function(form) {
  form.addEventListener('submit', handleFormSubmission);
});
