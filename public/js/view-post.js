$(document).ready(function () {

  /*
    if logged in user id  === post creator id
    include edit buttons
  */

    var url = window.location.href;
 
  
    if (url.indexOf("?post_id=") !== -1) {
      var postId = url.split("=")[1];
      getPostData(postId);
      getCommentData(postId);

      $(".submitcomment").on("click",createComment(postId));
      
    }
    // If there's no postId we go to dashboard for now
    // need to change it to global page
    else{
       // getPosts();
       window.location.href = "/explorer";
    }
     
    function dateFormat(randomDate,form){
        var randomFormat = "YYYY-MM-DDThh:mm.sssZ";
        var convertedDate = moment(randomDate, randomFormat);
        var modifiedDate = moment(convertedDate).format(form);
        return modifiedDate;
    }

    function getCommentData(id) {
      var queryUrl = "api/posts/" + id + "/comments";
      $.get(queryUrl, function(data){

        for(let i = data.length; i > 0; i--){

          var item = $("<ul class='comment-section'>");

          $.get("/user/" + data[i].UserId, function(result){

            let username = result.username;
            let userimage = result.image;
            console.log(result);
            
            item.append("<li class='comment'><div class='info'><a href='#'>" + username + "</a><span>4 hours ago</span></div><a class='avatar' href='#'><img src='/images/uplaod_images/" + userimage + "' width='35' alt='Profile Picture' title='" + username + "'</a><p>" + data[i].body + "</p></li>");

          });

          $(".write-new").append(item);
        }
      });
    }

    function getPostData(id) {
      var queryUrl = "/api/posts/" + id;
      $.get(queryUrl, function (data) {
        if (data) {
          $("#post-title").append(data.title);
          $("#post-body").append(data.body);
          $("#post-category").append(data.Category.name);
          //  if(data.image){
          var img = $("<img>").attr("src", "/images/upload_images/" + data.image);
          img.addClass("img-fluid post-image img-thumbnail mt-3 mb-2");
          $("#post-image").append(img);
          $("#post-date").append(dateFormat(data.createdAt,"MM/DD/YYYY hh:mm:ss"));
          getAuthorInfo(data.UserId);
        }
        else{
            window.location.href = "/dashboard";
        }
      });
    }

    function createComment(id){
      var body = $("#commentbody").val();
      var queryUrl = "api/post/" + id + "/comments/" + body;
      $.post(queryUrl, function() {
        console.log("Comment Submitted")
      })
    };

    function getAuthorInfo(id) {
      var queryUrl = "/user/" + id;
      $.get(queryUrl, function (data) {
        if (data) {
          var anchor = $("<a>").attr("href","/dashboard?user_id="+data.id);
          var img = $("<img>").attr("src", "/images/upload_images/" + data.image);
          var img2 = $("<img>").attr("src", "/images/upload_images/" + data.image);
          img2.attr("class","thumbnail");
          img.addClass("rounded-circle img-fluid post-creator-image");
          anchor.append(img);
          $(".userCommentsubmit").prepend(img2);
          $("#post-author-img").append(anchor);
          var authorAnchor = $("<a>").attr("href","/dashboard?user_id="+data.id);
          authorAnchor.addClass("author-anchor");
          authorAnchor.append(data.username);
          $("#post-author").append(authorAnchor);
          
          var loggedUserId= $(".logged-username").attr("data-userid");
         
          if(data.id == loggedUserId){
            ////edit buttons
            var editButtonContainer = $(".edit-buttons");
            var editButton = $("<button>").addClass("btn btn-info");
            var editIcon = $("<i>").addClass("far fa-edit");
            editButton.append(editIcon)
          

            var deleteButton = $("<button>").addClass("btn btn-danger ml-2");
            var deleteIcon = $("<i>").addClass("far fa-trash-alt");
            deleteButton.append(deleteIcon);

            editButtonContainer.append(editButton, deleteButton);
          }
         
         }
      })
    }
  });