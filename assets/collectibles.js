document.addEventListener('DOMContentLoaded', function () {
    // Track the number of clicks on the Special image
    var specialImage = document.querySelector('.special-explanations img');
    var clickCount = 0;
    var maxClicks = 3; 
  
    // Function to handle image click
    function handleImageClick() {
      clickCount++;
  
      // Check if the desired number of clicks is reached
      if (clickCount === maxClicks) {
        specialImage.src = 'assets/lego.png';
      }
    }
  
    // Add click event listener to the Special image
    specialImage.addEventListener('click', handleImageClick);
  });