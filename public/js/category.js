$(document).ready(function() {
  var nameInput = $("#category-name");
  var categoryList = $("tbody");
  var categoryContainer = $(".category-container");
  
  $(document).on("submit", "#category-form", handleCategoryFormSubmit);
  $(document).on("click", ".delete-category", handleDeleteButtonPress);
  $(document).on("click", ".edit-category", handleEditButtonPress);

  getCategory();
 
  function handleCategoryFormSubmit(event) {
    event.preventDefault();
    if (!nameInput.val().trim().trim()) {
      return;
    }
   
    upsertCategory({
      name: nameInput
        .val()
        .trim()
    });
  }

  function upsertCategory(categoryData) {
    $.post("/api/category", categoryData)
      .then(function(data){
        if(data.errors){
          renderEmpty(data.errors[0].message);
        }
         else{
          getCategory();
         }  
      });
  }

   function createCategoryRow(categoryData) {
    var newTr = $("<tr class='d-flex'>");
    newTr.data("category", categoryData);
    newTr.append("<td class='col-7 category-name'>" + categoryData.name + "</td>");
    newTr.append("<td class='col-5'><button class='btn btn-info mr-2 edit-category'><i class='far fa-edit'></i></button>"+
                                   "<button class='btn btn-danger delete-category'><i class='far fa-trash-alt'></i></button></td>");
    return newTr;
  }

  function getCategory() {
    $.get("/api/categories", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createCategoryRow(data[i]));
      }
      renderCategoryList(rowsToAdd);
      nameInput.val("");
    });
  }


  function renderCategoryList(rows) {
    //removes all except the last which is a form
    categoryList.children().not(":last").remove();
    categoryContainer.children(".alert").remove();
    if (rows.length) {
      categoryList.prepend(rows);
    }
    else {
      renderEmpty("No categories created.");
    }
  }

  function renderEmpty(text) {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text(text);
    categoryContainer.append(alertDiv);
  }


  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("category");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/category/" + id
    })
      .then(getCategory);
   }

   
  function handleEditButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("category");
    var categoryNameTd = $(this).parent().parent().children("td")[0];
    $(categoryNameTd).empty();
    var inputField = $('<input class="form-control" type="text" id="update-category-name" placeholder="Enter category">');
    inputField.val(listItemData.name);
    var updateBtn = $("<button class='btn btn-success mr-1 mt-1' id='update'>");
    updateBtn.html("Update");
    var cancelBtn = $("<button class='btn btn-warning mt-1' id='cancel'>");
    cancelBtn.html("Cancel");
    $(categoryNameTd).append(inputField,updateBtn,cancelBtn);
    var id = listItemData.id;

    $(categoryNameTd).on("click","#cancel",function(){
      $(".alert-danger").remove();
      $(categoryNameTd).empty();
      $(categoryNameTd).append(listItemData.name);
    });

    $(categoryNameTd).on("click","#update",function(){
       var newCategory = {
           name : inputField.val().trim()
       }
       updateCategory(newCategory,id);
    })
   
    function updateCategory(newCategory,id){
             $.ajax({
                 method: "PUT",
                 url: "/api/category/" + id,
                 data : newCategory
            })
           .then(function(data){
              if(data.errors){
                renderEmpty(data.errors[0].message);
              }
               else{
                getCategory();
               }          
           });
          }
      }
  });
   