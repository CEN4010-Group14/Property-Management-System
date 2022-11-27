(function($) {
    "use strict"; // Start of use strict
  
    // Show password
    function myFunction() {
        var x = document.getElementById("customCheck2");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }

  
  })(jQuery); // End of use strict
  