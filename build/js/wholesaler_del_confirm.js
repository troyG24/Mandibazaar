function handleFormSubmission(event) {

    event.preventDefault();

    var isConfirmed = confirm("Are you sure you want to delete this product?");

    if (isConfirmed) {
        var form = document.getElementById("myForm");
        form.submit();
    }
}
  
var submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", handleFormSubmission);

  