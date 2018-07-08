$(document).ready(function () {

  /*
    if logged in user id  === post creator id
    include edit buttons
  */

    var url = window.location.href;
  
    if (url.indexOf("?post_id=") !== -1) {
      postId = url.split("=")[1];
      getPostData(postId);
      getCommentData(postId);
      // $(document).on("click", "#submitcomment",createComment);
    }
    else{
       window.location.href = "/explorer";
    }

    $("#comment-form").on("submit",createComment);
     
    function dateFormat(randomDate,form){
        var randomFormat = "YYYY-MM-DDThh:mm.sssZ";
        var convertedDate = moment(randomDate, randomFormat);
        var modifiedDate = moment(convertedDate).format(form);
        return modifiedDate;
    }

    function getPostData(id) {
      var queryUrl = "/api/posts/" + id;
      $.get(queryUrl, function (data) {
        // console.log(data);
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
         
          //admin and creator of post can edit
          if(data.id == loggedUserId || user.userRole === "ADMIN"){
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
            editButtonContainer.on("click",".delete-post",function(){
              deletePost(user);
            });
          }});   
        }
      })
    }

  function editPost(){
    window.location.href = "/post?edit_post_id=" + postId;
  }

  function deletePost(user) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + postId
    })
      .then(function() {
        if(user.userRole === "ADMIN"){
          window.location.href="/user-management";
        }
        else{
          window.location.href = "/dashboard";
        }
      });
  }

  
  function editPost(){
    window.location.href = "/post?edit_post_id=" + postId;
  }

  // function getCommentData(id) {
  //   var queryUrl = "api/posts/" + id + "/comments";
  //   $.get(queryUrl, function(data){

  //     for(let i = data.length; i > 0; i--){

  //       var item = $("<ul class='comment-section'>");

  //       $.get("/user/" + data[i].UserId, function(result){

  //         let username = result.username;
  //         let userimage = result.image;
  //         console.log(result);
          
  //         item.append("<li class='comment'><div class='info'><a href='#'>" + username + "</a><span>4 hours ago</span></div><a class='avatar' href='#'><img src='/images/uplaod_images/" + userimage + "' width='35' alt='Profile Picture' title='" + username + "'</a><p>" + data[i].body + "</p></li>");

  //       });

  //       $(".write-new").append(item);
  //     }
  //   });
  // }

  // function createComment(){
  //   event.preventDefault();
  //   var body = $("#commentbody").val();
  //   console.log(body);
  //   var queryUrl = "/api/post/" + id + "/comments/" + body;
  //   $.post(queryUrl, function() {
  //     console.log("Comment Submitted")
  //   })
  // };

  
/***********************************************/
/*            Comment Section                  */
/***********************************************/

  //show all comments
  function getCommentData(postId){
    var container = $(".show-comments-div");
    var queryUrl = "/api/post/"+postId+"/comments";
    $.get(queryUrl, function(data) {
      // console.log(data);
       for(var i = 0; i < data.length; i++){
        var eachCommentDiv = $("<div>").addClass("single-comment-div media p-3 mt-2");
        var imgLink = $("<a>").attr("href","/dashboard?user_id="+data[i].UserId);
        var commenterImg = $("<img>").attr("src","/images/upload_images/"+data[i].User.image);
        commenterImg.addClass("mr-3 rounded-circle commenter-img");
        commenterImg.attr("alt",data[i].User.username);
        imgLink.append(commenterImg);
        var commentBodyDiv = $("<div>").addClass("media-body");
        var commenterLink = $("<a>").attr("href","/dashboard?user_id="+data[i].UserId);
        commenterLink.html(data[i].User.username);
        var commenter = $("<h6>").addClass("commenter").append(commenterLink);
        var commentDate = $("<span>").addClass("small-italic");
        commentDate.html(" Posted on "+dateFormat(data[i].createdAt,"MM/DD/YYYY hh:mm:ss"));
        commenter.append(commentDate);
        var commentBody = $("<p>").html(data[i].body);
        commentBodyDiv.append(commenter,commentBody);
        eachCommentDiv.append(imgLink,commentBodyDiv);
        container.append(eachCommentDiv);
       }
    });
  }

  //posting comment data
  function createComment(event){
    event.preventDefault();
    var commentbody = $("#commentbody").val().trim();
    //if body is empty, return
    if(!commentbody){
      return;
    }
    //else
    var comment = {
        body : commentbody,
        PostId : postId
    };
    submitCommentForm(comment); 
  }

  function submitCommentForm(comment){
        $.post("/api/comment/",comment)
          .then(function(data){
             window.location.href="/view-post?post_id="+postId;
        })
  }
  
  });

  


