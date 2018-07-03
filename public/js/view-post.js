$(document).ready(function () {

    var url = window.location.href;
  
    if (url.indexOf("?post_id=") !== -1) {
      var postId = url.split("=")[1];
      getPostData(postId);
    }
    // If there's no postId we go to dashboard for now
    // need to change it to global page
    else{
       // getPosts();
       window.location.href = "/dashboard";
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
  
    function getAuthorInfo(id) {
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
          authorAnchor.append(data.username);
          $("#post-author").append(authorAnchor);
        }
      })
    }
  
  
  });