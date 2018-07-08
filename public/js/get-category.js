$(document).ready(function () {
    
    getCategories();
    
    function getCategories() {
      $.get("/api/categories", function (data) {
        if (data) {
          var categoryContainer = $("#category");
          var option = $("<option>");
          option.attr("value", "default");
          option.attr("disabled", "disabled");
          option.attr("selected", "selected");
          option.html("Select a category [Required]");
          categoryContainer.append(option);
          for (var i = 0; i < data.length; i++) {
            var option = $("<option>");
            option.attr("value", data[i].id);
            option.html(data[i].name);
            categoryContainer.append(option);
          }
        }
      });
    }
  
  });