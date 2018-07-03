$(document).ready(function() {
    // Getting references to the name input and category container, as well as the table body
    var categoryInput = $("#category-name");
    var createdList = $("#createdSection");
    var updatedList = $("#updatedSection");
    var deletedList = $("#deletedSection");

 
    // Adding event listeners to the form to create a new object, and the button to delete
    // a category
    $(document).on("create", ".category-form", createCategory);
    $(document).on("update", ".category-form", updateCategory);
    $(document).on("delete", ".category-form", deleteCategory);
  
    var categoryName= {
      dbCategory:name.val().trim()};

    function createCategory (event) {
      event.preventDefault();
      
      if (categoryInput==="") {
        categoryInput==="".push(categoryName);
//update api with new category the append 
      $.post("/api/category", categoryName,function(data){
        console.log(data);
        res.json(data);
        createdList.append("<ul>" + data)
      })
      }
      else{ 
        updateCategory();
       
      }
    }
       function updateCategory(){
        
       if( categoryInput=== categoryName)
        $.ajax("/api/category" + categoryName, {
          type:"PUT",
          data:categoryInput
        }).then(
          function(){
            console.log(categoryInput)
          }
        )
       }
      
  //////////////////////////
    // Function for creating a new list row for categories
 /* function (dbCategory) {
    var newTr = $("<tr>");
    newTr.data("category", dbCategory);
    newTr.append("<td>" + dbCategory+ "</td>");
    newTr.append("<td> " + dbCategory + "</td>");
    newTr.append("<td><a href='/dashboard?Categories_id=" + dbCategory + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/post?Categories_id=" + dbCategory+ "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-category'>Delete Category</a></td>");
    return newTr;
  }
  
    // Function for retrieving catgeories and getting them ready to be rendered to the page
    function getCategories() {
      $.get("/api/category", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createCategoryRow(data[i].name));
        }
        renderCategoryList(rowsToAdd);
        nameInput.val("");
      });
    }
  
    // A function for rendering the list of categories to the page
    function renderCategoryList(rows) {
      categoryList.children().not(":last").remove();
      categoryContainer.children(".alert").remove();
      if (rows.length) {
        console.log(rows);
        categoryList.prepend(rows);
      }
      else {
        renderEmpty();
      }
    }
  
    // Function for handling what to render when there are no categories
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create a Category before you can create a Post.");
      categoryContainer.append(alertDiv);
    }
  
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("category");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
        url: "/api/category/" + id
      })
        .then(getCategories);
    }*/
  });
  