$(document).ready(function () {
<<<<<<< HEAD
=======
  var url = window.location.href;

  $.get("/user",function(data){
      var loggedUserId = data.id;
      if (url.indexOf("post?edit_post_id=") !== -1) {
        postId = url.split("=")[1];
        //checks to see whether the signed in user is the creator of the post
        $.get("/api/posts/"+postId+"/user/"+loggedUserId,function(post){
          if(post!==null){
            populatePostForm(postId);    
          }
          else{
              //if not the creator of the post
              window.location.href = "/dashboard";
           }
       });
    }
    else{
      //if not update, create new post
      getCategories();
    }
  });
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561

  
  function getCategories() {
    $.get("/api/categories", function (data) {
      if (data) {
        var categoryContainer = $("#category");
        var option = $("<option>");
        option.attr("value", "default");
        option.attr("disabled", "disabled");
<<<<<<< HEAD
        option.attr("selected", "selected");
        option.html("Select a category");
=======
        // option.attr("selected", "selected");
        option.html("Select a category [Required]");
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
        categoryContainer.append(option);
        for (var i = 0; i < data.length; i++) {
          var option = $("<option>");
          option.attr("value", i + 1);
          option.html(data[i].name);
          categoryContainer.append(option);
        }
      }
    });
  }

<<<<<<< HEAD
  getCategories();

  

=======
  function populatePostForm(id){
    var queryUrl = "/api/posts/" + id;
    $.get(queryUrl, function(data) {
        showPrepopulatedPost(data);
    });
  }

  //modifying existing form for edit with ajax
  function showPrepopulatedPost(data){
    getCategories();
    $(".header-post").html("Edit Post");
    $("#new-post").removeAttr("action method enctype");
    $("input#title" ).val(data.title);
    $("input#title").attr("disabled",true);
    $("input#title").removeAttr("required");
    $("#body").val(data.body);
    $("#category").val(data.category);
    $("input#pic").remove();
  
    $("#new-post").on("submit", function handleEdit(event) {
      event.preventDefault();
      if (!$("#body").val().trim() || !$("#category").val().trim()) {
        return;
      }
      var newPost = {
        body: $("#body").val().trim(),
        category: $("#category").val().trim()
      }
      updatePost(newPost);
    });
    
    // Update a given post, bring user to the updated post when done
    function updatePost(post) {
      $.ajax({
        method: "PUT",
        url: "/api/posts/"+postId,
        data: post
      })
        .then(function() {
          window.location.href = "/view-post?post_id="+postId;
        });
    }
  }
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
});