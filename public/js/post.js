$(document).ready(function () {

  var url = window.location.href;

  if (url.indexOf("?post_id=") !== -1) {
    var postId = url.split("=")[1];
    getPostData(postId);
  }
  // If there's no authorId we just get all posts as usual
  else {
    // getPosts();
  }

  function getCategories() {
    $.get("/api/categories", function (data) {
      if (data) {
        var categoryContainer = $("#category");
        var option = $("<option>");
        option.attr("value", "default");
        option.attr("disabled", "disabled");
        option.attr("selected", "selected");
        option.html("Select a category of your post");
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

  getCategories();


  function getPostData(id) {
    var queryUrl = "/api/posts/" + id;
    $.get(queryUrl, function (data) {
      if (data) {
        console.log(data);
        $("#post-title").append(data.title);
        $("#post-body").append(data.body);
        $("#post-category").append(data.Category.name);
        //  if(data.image){
        var img = $("<img>").attr("src", "/images/upload_images/" + data.image);
        img.addClass("img-style");
        $("#post-image").append(img);
        $("#post-date").append(data.createdAt);
        getAuthorInfo(data.UserId);
      }
    });
  }

  function getAuthorInfo(id) {
    var queryUrl = "/user/" + id;
    $.get(queryUrl, function (data) {
      if (data) {
        console.log(data);
        $("#post-author").append(data.username);
      }
    })
  }
  


});