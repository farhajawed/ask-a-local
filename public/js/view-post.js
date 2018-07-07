$(document).ready(function () {

  /*
    if logged in user id  === post creator id
    include edit buttons
  */

    var url = window.location.href;
 
  
    if (url.indexOf("?post_id=") !== -1) {
      postId = url.split("=")[1];
      getPostData(postId);
    }
    else{
       window.location.href = "/explorer";
    }
     
    function dateFormat(randomDate,form){
        var randomFormat = "YYYY-MM-DDThh:mm.sssZ";
        var convertedDate = moment(randomDate, randomFormat);
        var modifiedDate = moment(convertedDate).format(form);
        return modifiedDate;
    }

    function getPostData(id) {
      var queryUrl = "/api/posts/" + id;
      $.get(queryUrl, function (data) {
        console.log(data);
        if (data) {
          $("#post-title").append(data.title);
          $("#post-body").append(data.body);
          if(data.Category!==null){
            $("#post-category").append(data.Category.name+" | ");
          }
          if(data.image){
            var img = $("<img>").attr("src", "/images/upload_images/" + data.image);
            img.addClass("img-fluid post-image img-thumbnail mt-3 mb-2");
            $("#post-image").append(img);
          }
          $("#post-date").append("Created : "+dateFormat(data.createdAt,"MM/DD/YYYY hh:mm:ss")+" | ");
          $("#post-update-date").append("Last updated : "+dateFormat(data.updatedAt,"MM/DD/YYYY hh:mm:ss"));
          getAuthorInfo(data.UserId,data);
        }
        else{
            window.location.href = "/dashboard";
        }
      });
    }
  
    function getAuthorInfo(id,post) {
      var queryUrl = "/user/" + id;
      $.get(queryUrl, function (data) {
        if (data) {
          var anchor = $("<a>").attr("href","/dashboard?user_id="+data.id);
          var img = $("<img>").attr("src", "/images/upload_images/" + data.image);
          img.addClass("rounded-circle img-fluid post-creator-image");
          anchor.append(img);
          $("#post-author-img").append(anchor);
          var authorAnchor = $("<a>").attr("href","/dashboard?user_id="+data.id);
          authorAnchor.addClass("author-anchor");
          authorAnchor.append(data.username+" | ");
          $("#post-author").append(authorAnchor);

          $.get("/user",function(user){
           loggedUserId= user.id;
         
          if(data.id == loggedUserId){
            //edit buttons
            var editButtonContainer = $(".edit-buttons");

            var editButton = $("<button>").addClass("btn btn-info edit-post");
            var editIcon = $("<i>").addClass("far fa-edit");
            editButton.append(editIcon)
          

            var deleteButton = $("<button>").addClass("btn btn-danger ml-2 delete-post");
            deleteButton.data("post",post);
            var deleteIcon = $("<i>").addClass("far fa-trash-alt");
            deleteButton.append(deleteIcon);

            editButtonContainer.append(editButton, deleteButton);    
            editButtonContainer.on("click",".edit-post",editPost);
            editButtonContainer.on("click",".delete-post",deletePost);
          }});   
        }
      })
    }


  function deletePost() {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + postId
    })
      .then(function() {
        window.location.href = "/dashboard";
      });
  }

  
  function editPost(){
    window.location.href = "/post?edit_post_id=" + postId;
    
  }

});
