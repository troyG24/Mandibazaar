
document.addEventListener('DOMContentLoaded', function() {
    // Function to show the popup
    function showPopup() {
      alert('You need to Signup first or Login if you are already registered with MandiBazaar');
    }
  
    // Attach click event listeners to the buttons
    document.getElementById('btn1').addEventListener('click', showPopup);
    document.getElementById('btn2').addEventListener('click', showPopup);
  });